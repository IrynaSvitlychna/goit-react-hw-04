

function SearchBar({ onSearch}) {
  // const [count, setCount] = useState(0)
  const handleSubmit = (e) => {
     e.preventDefault();
    const form = e.target;
    const topic = form.elements.topic.value;
    if(form.elements.topic.value.trim() === "") {
			alert("Please enter search term!")
			return;
		}
    onSearch(topic);
    form.reset();
  };

  }
  return (
    <>
      <header>
        <form onSubmst={handleSubmit}>
          <input
            type="text"
            name="topsc"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
           <button type="submit">Search</button>
       </form>
     </header>
    </>
  )
}

export default SearchBar