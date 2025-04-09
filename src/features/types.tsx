// Тип одного вопроса
export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number; // индекс правильного ответа
}

// Тип для состояния квиза
export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  gameOver: boolean;
}
