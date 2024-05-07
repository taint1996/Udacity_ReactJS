import { User } from "../../src/features/models/User";
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../../src/utils/_DATA";

describe("Question and User Management Tests", () => {
  describe("_getUsers", () => {
    it("should retrieve the users data", async () => {
      const users = await _getUsers();
      expect(users).toBeDefined();
    });
  });

  describe("_getQuestions", () => {
    it("should retrieve the questions data", async () => {
      const questions = await _getQuestions();
      expect(questions).toBeDefined();
    });
  });

  describe("_saveQuestion", () => {
    it("should save a new question", async () => {
      const question = {
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        author: {
          id: "sarahedo",
          password: "1234",
          name: "Sarah Edo",
          avatarURL: "/assets/images/snow.jpg",
          answers: {},
          questions: [],
        },
      };

      const savedQuestion = await _saveQuestion(question);
      expect(savedQuestion).toBeDefined();
      expect(savedQuestion.id).toBeDefined();
      expect(savedQuestion.author).toBe(question.author.id);
    });

    it("should reject when required fields are missing", async () => {
      const emptyUser: User = {
        id: "",
        name: "",
        password: "",
        avatarURL: "",
        answers: {},
        questions: [],
      };

      await expect(
        _saveQuestion({
          optionOneText: "",
          optionTwoText: "",
          author: emptyUser,
        })
      ).rejects.toEqual(
        "Please provide 2 answers of the question and its author"
      );
      await expect(
        _saveQuestion({
          optionOneText: "Option One",
          optionTwoText: "Option Two",
          author: emptyUser,
        })
      ).rejects.toEqual(
        "Please provide 2 answers of the question and its author"
      );
    });
  });

  describe("_saveQuestionAnswer", () => {
    it("should save a user's answer to a question", async () => {
      const user = {
        authedUser: "sarahedo", 
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: "optionOne"
      }

      const result = await _saveQuestionAnswer(user);
      expect(result).toBeTruthy();
    });

    it("should reject when required fields are missing", async () => {
      await expect(
        _saveQuestionAnswer({ authedUser: "", qid: "", answer: "" })
      ).rejects.toBeTruthy();
      await expect(
        _saveQuestionAnswer({ authedUser: "sarahedo", qid: "", answer: "" })
      ).rejects.toBeTruthy();
    });
  });
});
