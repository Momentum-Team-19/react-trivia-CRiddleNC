// TriviaQuestions.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";

function TriviaQuestions({
  questions,
  setQuestions,
  activeQuestInd,
  setActiveQuestInd,
  setHasSelCat,
  handleAnswer,
  selCat,
}) {
  const quest = questions[activeQuestInd];

  const handleNextQuestion = () => {
    if (activeQuestInd < questions.length - 1) {
      setActiveQuestInd(activeQuestInd + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestInd !== 0) {
      setActiveQuestInd(activeQuestInd - 1);
    }
  };

  const fetchQuestions = (categoryId) => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${categoryId}`)
      .then((response) => setQuestions(response.data.results));
  };

  useEffect(() => {
    if (selCat) {
      fetchQuestions(selCat.id);
    }
  }, [selCat]);

  if (quest) {
    // combine correct and incorrect answers into one array
    const all_answers = [quest.correct_answer, ...quest.incorrect_answers].map(
      (answer) => he.decode(answer)
    );

    // set all_answers to a randomized version of itself with Math.random function
    all_answers.sort(() => Math.random() - 0.5);

    return (
      <div>
        <h2>Trivia Questions</h2>
        <p>{he.decode(quest.question)}</p>
        <p>{he.decode(quest.correct_answer)}</p>

        {all_answers.map((answerOption) => (
          <button key={answerOption} onClick={() => handleAnswer(answerOption)}>
            {answerOption}
          </button>
        ))}

        <button onClick={handlePreviousQuestion}>Previous Question</button>
        <button onClick={handleNextQuestion}>Next Question</button>
        <button
          onClick={() => {
            setHasSelCat(false);
          }}
        >
          Back to Categories
        </button>
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
