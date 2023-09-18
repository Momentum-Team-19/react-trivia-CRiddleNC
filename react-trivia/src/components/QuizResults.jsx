// QuizResults.jsx
import React, { useState, useEffect } from "react";

function QuizResults({ userAnswers, correctAnswers, setHasSelCat, questions }) {
  const totalQuestions = userAnswers.length;
  const [correctCount, setCorrectCount] = useState(0);
  const [results, setResults] = useState([]);

  useEffect(() => {
    let count = 0;
    const userResults = userAnswers.map((isCorrect, index) => {
      if (isCorrect) {
        count++;
      }

      return (
        <div key={index}>
          <p>
            Question {index + 1}: {isCorrect ? "Correct" : "Incorrect"}
          </p>
          <p>
            {questions[index]} : {correctAnswers[index]}
          </p>
        </div>
      );
    });

    setCorrectCount(count);
    setResults(userResults);
  }, [userAnswers, correctAnswers, questions]);

  const score = (correctCount / totalQuestions) * 100;

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>Your Score: {(correctCount / totalQuestions) * 100}%</p>
      <p>Total Questions: {totalQuestions}</p>
      {results}
      <button
        onClick={() => {
          setHasSelCat(false);
        }}
      >
        Back to Categories
      </button>
      <button
        onClick={() => {
          setHasSelCat(false);
          restartQuiz(); // Call the restartQuiz function from props
        }}
      >
        Restart-BROKEN-Quiz
      </button>
    </div>
  );
}

export default QuizResults;
