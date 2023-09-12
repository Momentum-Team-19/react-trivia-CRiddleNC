// TriviaQuestions.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import Categories from "./Catagories";

function TriviaQuestions({
  questions,
  setQuestions,
  activeQuestInd,
  setActiveQuestInd,
  setHasSelCat,
}) {
  const quest = questions[activeQuestInd];

  const handleNextQuestion = () => {
    if (activeQuestInd < questions.length - 1) {
      setActiveQuestInd(activeQuestInd + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestInd != 0) {
      setActiveQuestInd(activeQuestInd - 1);
    }
  };

  // // figure out how to get back to my list of categories
  // const handleBackToCats = () => {};

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

    // set all_answers to a randomized version of itself with Math.random function
    all_answers.sort(() => Math.random() - 0.5);

    return (
      <div>
        <h2>Trivia Questions</h2>

        <p>{he.decode(quest.question)}</p>
        <p>{he.decode(quest.correct_answer)}</p>

        <p>Answers: {all_answers.join(", ")}</p>
        {/* add answer choices and any additional information */}
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
