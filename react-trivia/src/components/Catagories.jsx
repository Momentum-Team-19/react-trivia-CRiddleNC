function Categories({ trivCatData, setSelCat }) {

    const handleClick=(event) => {
        console.log(event.target.id)
    }

  return (

  <div>
    {trivCatData &&
    // Map over the trivCatData array to render trivia categories
    trivCatData.map((trivCat) => (
        // Use a unique key for each category to help React efficiently update the DOM
        <button id={trivCat.id} onClick={handleClick} key={trivCat.id}>{trivCat.name}</button>
    ))}
    </div>
  )
}
export default Categories