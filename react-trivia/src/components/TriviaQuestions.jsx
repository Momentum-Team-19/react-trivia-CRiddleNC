// TriviaQuestions.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

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

  if (quest) {
    // combine correct and incorrect answerrs in to one array
    const all_answers = [quest.correct_answer, ...quest.incorrect_answers].map(
      (answer) => he.decode(answer)
    );
    // decode all_answers and join them in to a string

    return (
      <div>
        <h2>Trivia Questions</h2>

        <p>{he.decode(quest.question)}</p>
        <p>{he.decode(quest.correct_answer)}</p>

        <p>Answers: {all_answers.join(", ")}</p>
        {/* add answer choices and any additional information */}
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Trivia Questions</h2>
      </div>
    );
  }
}

export default TriviaQuestions;
