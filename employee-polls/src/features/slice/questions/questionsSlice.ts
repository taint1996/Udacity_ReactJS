import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/index";
import { Question } from "../../models/Question";
import { _getQuestions } from "../../../utils/_DATA";
import { User } from "../../models/User";

interface QuestionsState {
  questions: Question[];
  filteredQuestions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
  filteredQuestions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    getQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.filteredQuestions = action.payload;
    },
    saveQuestion: (state, action: PayloadAction<Question>) => {
      const newQuestion = action.payload;

      return {
        ...state,
        questions: [...state.questions, newQuestion],
        filteredQuestions: [...state.filteredQuestions, newQuestion],
      };
    },
  },
});

export const { getQuestions, setQuestions, saveQuestion } =
  questionsSlice.actions;

export const fetchQuestions = () => {
  return async (
    dispatch: ThunkDispatch<RootState, unknown, PayloadAction<Question[]>>
  ) => {
    try {
      const questionsRecord: Record<string, Question> = await _getQuestions();
      const questions: Question[] = Object.values(questionsRecord);

      dispatch(setQuestions(questions));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
};

export function getFilteredQuestionIds(
  questions: Question[],
  authedUser: User | null,
  showAnswered: boolean
): string[] {
  const questionDict: Record<string, Question> = {};

  questions.forEach((question) => {
    questionDict[question.id] = question;
  });

  const filteredQuestionIds: string[] = Object.keys(questionDict)
    .filter((id) => {
      const question: Question = questionDict[id];
      const hasAnswered =
        authedUser !== null &&
        authedUser.id !== undefined &&
        ((question.optionOne.votes ?? []).includes(authedUser.id) ||
          (question.optionTwo.votes ?? []).includes(authedUser.id));

      return showAnswered ? hasAnswered : !hasAnswered;
    })
    .sort((a, b) => {
      const timestampA = questionDict[a].timestamp;
      const timestampB = questionDict[b].timestamp;
      return timestampB - timestampA;
    });

  return filteredQuestionIds;
}

export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;
