// QuizResults.jsx
import React, { useState } from "react";

function QuizResults({ userAnswers, correctAnswers, setHasSelCat }) {
  const totalQuestions = userAnswers.length;
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const results = userAnswers.map((userAnswer, index) => {
    if (userAnswer === correctAnswers[index]) {
      // const isCorrect = userAnswer === correctAnswers[index];
      setCorrectCount(correctCount + 1);
      setIsCorrect(true);
    } else {
      setCorrectCount(correctCount);
      setIsCorrect(false);
    }

    return (
      <div key={index}>
        <p>
          Question {index + 1}: {isCorrect ? "Correct" : "Incorrect"}
        </p>
      </div>
    );
  });

  const score = (correctCount / totalQuestions) * 100; // Calculate the score

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your Score: {score}%</p>
      <p>Total Questions: {totalQuestions}</p>
      {results}
      <button
        onClick={() => {
          setHasSelCat(false);
        }}
      >
        Back to Categories
      </button>
    </div>
  );
}

export default QuizResults;
