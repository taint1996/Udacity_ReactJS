/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { Box } from "@mui/material";
import React from "react";
import { Question } from "../../features/models/Question";
import { selectIsLoggedIn } from "../../features/slice/auth/authSlice";
import {
  getFilteredQuestionIds,
  selectQuestions,
} from "../../features/slice/questions/questionsSlice";
import QuestionItem from "./QuestionItem";
import { useNavigate } from "react-router-dom";

interface QuestionListProps {
  showAnswered: boolean;
}

const QuestionList: React.FC<QuestionListProps> = ({ showAnswered }) => {
  const authedUser = useSelector((state: RootState) => state.auth.user);
  const userLoggedIn = useSelector(selectIsLoggedIn);
  const questions = useSelector(selectQuestions);

  const navigate = useNavigate();

  const handleShowQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  const renderTemplateAnswerQuestion = () => {
    const filteredQuestionIds = getFilteredQuestionIds(
      questions,
      authedUser,
      showAnswered
    );

    if (authedUser && userLoggedIn && filteredQuestionIds.length > 0) {
      return filteredQuestionIds.map((id: string) => {
        const question: Question = questions.find((q) => q.id === id);
        const author = question?.author;

        return (
          <QuestionItem
            question={question}
            author={author}
            onHandleShowQuestion={() => handleShowQuestion(id)}
            key={id}
          />
        );
      });
    }

    return null;
  };

  const renderTemplateNoAnswer = () => {
    return (
      <Box
        sx={{
          width: "100%",
          typography: "body1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: showAnswered && userLoggedIn ? "secondary.main" : "inherit",
        }}
      >
        {showAnswered && userLoggedIn ? (
          <h1>No answered polls available</h1>
        ) : (
          <h1>No unanswered polls available</h1>
        )}
      </Box>
    );
  };

  const noFilteredQuestions =
    authedUser && userLoggedIn && renderTemplateAnswerQuestion() === null;

  return (
    <>
      <Box variant="div" component="div">
        {!authedUser ? (
          <h1>Please login</h1>
        ) : noFilteredQuestions ? (
          renderTemplateNoAnswer()
        ) : (
          renderTemplateAnswerQuestion()
        )}
      </Box>
    </>
  );
};

export default QuestionList;
