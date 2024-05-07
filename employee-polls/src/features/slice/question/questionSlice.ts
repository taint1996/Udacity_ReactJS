import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import { Question } from "../../models/Question";
import { RootState } from "../../store";
import { User } from "../../models/User";
import { _saveQuestion, _saveQuestionAnswer } from "../../../utils/_DATA";
import { saveUserAnswer, saveUserQuestion } from "../auth/authSlice";
import { saveQuestion } from "../questions/questionsSlice";
import { saveUsersOfNewQuestion } from "../users/usersSlice";

interface QuestionState {
  questions: Record<string, Question>;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: {},
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    saveAnswerQuestion(
      state,
      action: PayloadAction<{ author: string; qid: string; answer: string }>
    ) {
      const { author, qid, answer } = action.payload;
      state.questions[qid].answers[author] = answer;
    },
    // TODO
    // answerQuestion: (
    //   state,
    //   action: PayloadAction<{
    //     questionId: string;
    //     answer: string;
    //     userId: string;
    //   }>
    // ) => {
    //   const { questionId, answer, userId } = action.payload;

    //   if (!state.questions[questionId][answer]) {
    //     state.questions[questionId][answer] = {
    //       text: answer,
    //       votes: [],
    //     };
    //   }
    //   if (userId) {
    //     state.questions[questionId][answer].votes.push(userId);
    //   }
    // },
  },
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const saveQuestionToStorage = (user: User, questionId: string) => {
  if (user) {
    const updatedUser = JSON.parse(JSON.stringify(user));
    updatedUser.questions.push(questionId);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
};

export const handleSaveQuestion = (
  optionOne: string,
  optionTwo: string
): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const { auth } = getState();
      const user: User | null = auth ? auth.user : null;

      if (!user) {
        throw new Error("User is not authenticated.");
      }

      const question = await _saveQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: user,
      });

      dispatch(saveQuestion(question as Question));
      dispatch(saveUserQuestion({ question }));
      dispatch(
        saveUsersOfNewQuestion({ userId: user.id, questionId: question.id })
      );
      saveQuestionToStorage(user, question.id);
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };
};

export const handleSaveAnswerQuestion = (
  questionId: string,
  answer: string
): AppThunk => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const user: User | null = auth ? auth.user : null;

    if (!user) {
      return;
    }

    try {
      await _saveQuestionAnswer({
        authedUser: user.id,
        qid: questionId,
        answer: answer,
      });

      dispatch(
        saveAnswerQuestion({
          author: user.id,
          qid: questionId,
          answer: answer,
        })
      );

      dispatch(
        saveUserAnswer({
          questionId,
          answer,
        })
      );
    } catch (error) {
      console.error("Error saving question answer:", error);
    }
  };
};

export const { saveAnswerQuestion } = questionSlice.actions; // TODO answerQuestion,

export default questionSlice.reducer;
