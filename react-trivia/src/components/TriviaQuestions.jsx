import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import QuizResults from "./QuizResults"; // Import the QuizResults component

function TriviaQuestions({
  questions,
  setQuestions,
  activeQuestInd,
  setActiveQuestInd,
  setHasSelCat,
  handleAnswer: handleAnswerProp,
  selCat,
  wrongAnswerCount,
  setWrongAnswerCount,
}) {
  const quest = questions[activeQuestInd];
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false); // Add quizCompleted state

  const handleNextQuestion = () => {
    if (activeQuestInd < questions.length - 1) {
      setActiveQuestInd(activeQuestInd + 1);
      setIncorrectGuesses(0);
    } else {
      setQuizCompleted(true); // Set quiz as completed
    }
  };

  const handlePreviousQuestion = () => {
    if (activeQuestInd !== 0) {
      setActiveQuestInd(activeQuestInd - 1);
      setIncorrectGuesses(0);
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

  useEffect(() => {
    if (quest) {
      // Combine correct and incorrect answers into one array
      const all_answers = [
        quest.correct_answer,
        ...quest.incorrect_answers,
      ].map((answer) => he.decode(answer));

      // Shuffle the answers using the Fisher-Yates shuffle algorithm
      const shuffled = [...all_answers];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      // Update the state with the shuffled answers
      setShuffledAnswers(shuffled);
    }
  }, [quest]);

  const handleAnswer = (selectedAnswer) => {
    const isCorrect =
      selectedAnswer === he.decode(questions[activeQuestInd].correct_answer);
    // Update userAnswers with the user's response
    setUserAnswers((prevAnswers) => [...prevAnswers, isCorrect]);

    if (activeQuestInd < questions.length - 1) {
      setActiveQuestInd(activeQuestInd + 1);
      setIncorrectGuesses(0);
    } else {
      // All questions answered, show results
      setQuizCompleted(true);
    }
  };

  return (
    <div>
      <h2>Trivia Questions</h2>
      {!quizCompleted && quest && (
        <div className='page-container'>
          <div className='answer-box'>
            <p>{he.decode(quest.question)}</p>
            {/* <p>{he.decode(quest.correct_answer)}</p> */}

            {shuffledAnswers.map((answerOption) => (
              <button
                key={answerOption}
                onClick={() => handleAnswer(answerOption)}
              >
                {answerOption}
              </button>
            ))}
            {incorrectGuesses >= 3 && (
              <p>Correct Answer: {he.decode(quest.correct_answer)}</p>
            )}
          </div>
          <div className='button-box'>
            {/* <p># of Wrong Answers: {wrongAnswerCount}</p> */}
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
        </div>
      )}

      {quizCompleted && (
        <QuizResults
          userAnswers={userAnswers}
          setHasSelCat={setHasSelCat}
          correctAnswers={questions.map(
            (q) => he.decode(q.correct_answer) // Extract correct answers
          )}
          questions={questions.map((q) => he.decode(q.question))}
        />
      )}
    </div>
  );
}

export default TriviaQuestions;
