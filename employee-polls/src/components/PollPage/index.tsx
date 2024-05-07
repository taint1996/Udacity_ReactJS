import { ThemeProvider } from "@emotion/react";
import { Avatar, Container, Typography, createTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestions } from "../../features/slice/questions/questionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserLoggedIn } from "../../features/slice/auth/authSlice";
import { fetchUsers, selectUsers } from "../../features/slice/users/usersSlice";
import { Question } from "../../features/models/Question";
import NotFound from "../NotFound";
import { Grid } from "@mui/material";
import { showImageUser } from "../../utils/usersUtil";
import Button from "@mui/material/Button";
import { handleSaveAnswerQuestion } from "../../features/slice/question/questionSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../features/store";

const PollPage: FC = () => {
  const defaultTheme = createTheme();
  const { questionId } = useParams();
  const userLoggedIn = useSelector(selectUserLoggedIn);
  const questions = useSelector(selectQuestions);

  const dispatch: AppDispatch =
    useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();
  const users = useSelector(selectUsers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const question = Object.values(questions).find(
    (question: Question) => question.id === questionId
  ) as Question;

  if (!question) {
    return <NotFound />;
  }

  const user = Object.values(users).find((u) => u.id === question.author);

  const handleQuestionOne = () => {
    if (userLoggedIn) {
      dispatch(handleSaveAnswerQuestion(question.id, "optionOne"));
      navigate("/");
    }
  };

  const handleQuestionTwo = () => {
    if (userLoggedIn) {
      dispatch(handleSaveAnswerQuestion(question.id, "optionTwo"));
      navigate("/");
    }
  };

  const hasVotedForOptionOne =
    userLoggedIn &&
    question.optionOne.votes &&
    question.optionOne.votes.includes(userLoggedIn.id);
  const hasVotedForOptionTwo =
    userLoggedIn &&
    question.optionTwo.votes &&
    question.optionTwo.votes.includes(userLoggedIn.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const calcPercentage = (option: string, question: Question) => {
    const optionOneVotesLength = question.optionOne.votes?.length || 0;
    const optionTwoVotesLength = question.optionTwo.votes?.length || 0;
    const numberVotesTotal = optionOneVotesLength + optionTwoVotesLength;

    const calculatePercentage = (votesLength: number) =>
      Math.min((votesLength / numberVotesTotal) * 100, 100);

    const percentageOptionOne = calculatePercentage(optionOneVotesLength);
    const percentageOptionTwo = calculatePercentage(optionTwoVotesLength);

    switch (option) {
      case "optionOne":
        return `${percentageOptionOne.toFixed(2)}%`;
      case "optionTwo":
        return `${percentageOptionTwo.toFixed(2)}%`;
      default:
        return "";
    }
  };

  const styles = {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  };

  const percentageOptionOne = calcPercentage("optionOne", question);
  const percentageOptionTwo = calcPercentage("optionTwo", question);

  const renderTemplate = () => {
    return (
      <>
        <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
          <Grid item xs={12} sx={styles}>
            <Typography variant="h5" component="h5">
              <div>Poll by {user?.id}</div>
            </Typography>
          </Grid>
          <Grid item xs={12} sx={styles}>
            <Avatar
              alt="Avt Login"
              src={showImageUser(user?.avatarURL)}
              sx={{ width: 150, height: 150, marginRight: "10px" }}
            />
          </Grid>
          <Grid item xs={12} sx={styles}>
            <Typography variant="h5" component="h5">
              <div>Would You Rather</div>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              gap: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              disabled={!!hasVoted}
              variant={hasVotedForOptionOne ? "contained" : "text"}
              onClick={handleQuestionOne}
            >
              {question.optionOne.text}{" "}
              {hasVoted && (
                <>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ marginLeft: "10px" }}
                  >
                    <span>
                      {question.optionOne.votes &&
                        question.optionOne.votes.length}
                    </span>
                  </Typography>
                  <Typography
                    component="h5"
                    variant="h5"
                    sx={{ marginLeft: "10px" }}
                  >
                    <span>{percentageOptionOne}</span>
                  </Typography>
                </>
              )}
            </Button>
            <Button
              disabled={!!hasVoted}
              variant={hasVotedForOptionTwo ? "contained" : "text"}
              onClick={handleQuestionTwo}
            >
              {question.optionTwo.text}{" "}
              {hasVoted && (
                <>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ marginLeft: "10px" }}
                  >
                    <span>
                      {question.optionTwo.votes &&
                        question.optionTwo.votes.length}
                    </span>
                  </Typography>

                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{ marginLeft: "10px" }}
                  >
                    <span>{percentageOptionTwo}</span>
                  </Typography>
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          {renderTemplate()}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default PollPage;
