// QuizResults.jsx
import React from "react";

function QuizResults({ userAnswers, correctAnswers, setHasSelCat }) {
  const totalQuestions = userAnswers.length;
  let correctCount = 0;

  const results = userAnswers.map((userAnswer, index) => {
    const isCorrect = userAnswer === correctAnswers[index];
    if (isCorrect) {
      correctCount++;
    }
    return (
      <div key={index}>
        <p>
          Question {index + 1}: {isCorrect ? "Correct" : "Incorrect"}
        </p>
      </div>
    );
  });

  const score = ((correctCount / totalQuestions) * 100).toFixed(2); // Calculate the score

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
