// Import modules and components
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Categories from './components/Catagories';
import { Loading } from './components/Loading'


function App() {
  // Declare a state variable trivCatData and a function setTrivCatData to update it
  const [trivCatData, setTrivCatData] = useState([]);
  const [selCat, setSelCat] = useState(null);
  const [loading, setLoading] =useState(true);


  // Use the useEffect hook to make an HTTP GET request when the component mounts
  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then((response) => setTrivCatData(response.data.trivia_categories));
  }, []); // The empty dependency array ensures this effect runs only once

  // Render the component's UI
  return (
    <>
      <h1>Trivia!</h1>
        <Categories trivCatData={trivCatData} setSelCat={selCat}/>
    </>
  );
}

export default App;