import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuizState } from "../types";
const initialState: QuizState = {
  questions: [
    {
      id: 1,
      question: "Что такое Redux?",
      options: [
        "Библиотека для работы с DOM",
        "Менеджер состояния",
        "Фреймворк",
      ],
      answer: 1,
    },
    {
      id: 2,
      question: "Какой метод обновляет состояние в Redux?",
      options: ["setState", "dispatch", "useState"],
      answer: 1,
    },
    {
      id: 3,
      question: "Ты меня любишь?",
      options: ["Да", "Нет"],
      answer: 0,
    },
  ],
  currentQuestionIndex: 0,
  score: 0,
  gameOver: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextQuestion(state) {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
      } else {
        state.gameOver = true;
      }
    },
    previousQuestion(state) {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
      }
    },
    answerQuestion(state, action: PayloadAction<{ answerIndex: number }>) {
      const { answerIndex } = action.payload;
      if (state.questions[state.currentQuestionIndex].answer === answerIndex) {
        state.score++;
      }
      state.currentQuestionIndex++;
      if (state.currentQuestionIndex >= state.questions.length) {
        state.gameOver = true;
      }
    },
    restartGame(state) {
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.gameOver = false;
    },
  },
});

export const { nextQuestion, previousQuestion, answerQuestion, restartGame } =
  quizSlice.actions;

export default quizSlice.reducer;
