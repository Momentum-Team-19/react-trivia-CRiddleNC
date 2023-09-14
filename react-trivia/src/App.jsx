// App.jsx
// Import modules and components
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Categories from "./components/Catagories";
import { Loading } from "./components/Loading";
import TriviaQuestions from "./components/TriviaQuestions";
import he from "he";

function App() {
  const [trivCatData, setTrivCatData] = useState([]);
  const [selCat, setSelCat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSelCat, setHasSelCat] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeQuestInd, setActiveQuestInd] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

  const handleCategory = (trivCatData) => {
    setSelCat(trivCatData);
    setHasSelCat(true);
    setActiveQuestInd(0);
    fetchQuestions(trivCatData.id);
  };

  const fetchQuestions = (categoryId) => {
    axios
      .get(`https://opentdb.com/api.php?amount=10&category=${categoryId}`)
      .then((response) => setQuestions(response.data.results));
  };

  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []);

  return (
    <>
      <h1>Trivia!</h1>
      {hasSelCat ? (
        <TriviaQuestions
          questions={questions}
          setQuestions={setQuestions}
          activeQuestInd={activeQuestInd}
          setActiveQuestInd={setActiveQuestInd}
          setHasSelCat={setHasSelCat}
          setWrongAnswerCount={setWrongAnswerCount}
          correctAnswers={questions.map((q) => he.decode(q.correct_answer))}
        />
      ) : (
        <Categories trivCatData={trivCatData} handleCategory={handleCategory} />
      )}
    </>
  );
}

export default App;
