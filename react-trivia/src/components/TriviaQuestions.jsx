// TriviaQuestions.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function TriviaQuestions({
  questions,
  setQuestions,
  activeQuestInd,
  setActiveQuestInd,
}) {
  const quest = questions[activeQuestInd];
  const handleNextQuestion = () => {
    if (activeQuestInd < questions.length - 1) {
      setActiveQuestInd(activeQuestInd + 1);
    }
  };

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&`)
      .then((response) => setQuestions(response.data.results));
  }, []);

  return (
    <div>
      <h2>Trivia Questions</h2>
      {/* Need to use he.decode to fix symbols */}
      <p>{quest?.question}</p>
      <button onClick={handleNextQuestion}>Next Question</button>
      {/* build button to advance activeQuestInd */}
    </div>
  );
}

export default TriviaQuestions;
