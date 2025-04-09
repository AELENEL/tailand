import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { answerQuestion, restartGame } from "../features/quiz/quizSlice";

const QuizGame: React.FC = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, gameOver } = useSelector(
    (state: RootState) => state.quiz
  );

  const currentQuestion = questions[currentQuestionIndex];
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const handleAnswer = (index: number) => {
    dispatch(answerQuestion({ answerIndex: index }));
  };

  const moveButton = () => {
    const button = noButtonRef.current;
    if (button) {
      const container = button.parentElement;
      const maxX = container!.clientWidth - button.offsetWidth;
      const maxY = container!.clientHeight - button.offsetHeight;

      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      button.style.position = "absolute";
      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
    }
  };

  if (gameOver) {
    return (
      <div>
        <h2>Мужчина!Ни секунды не сомневался</h2>

        <button onClick={() => dispatch(restartGame())}>Начать заново</button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", minHeight: "200px" }}>
      <h2>Вопрос {currentQuestionIndex + 1}</h2>
      <p>{currentQuestion.question}</p>
      <div style={{ position: "relative" }}>
        {currentQuestion.options.map((option, index) => {
          const isNo = option.toLowerCase() === "нет";

          return (
            <button
              key={index}
              ref={isNo ? noButtonRef : null}
              onClick={() => handleAnswer(index)}
              onMouseEnter={isNo ? moveButton : undefined}
              style={{
                margin: "10px",
                transition: "all 0.3s ease",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizGame;
