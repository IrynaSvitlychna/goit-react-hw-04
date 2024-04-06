import { useId } from "react";
import toast from "react-hot-toast";
import { FaExclamationCircle } from "react-icons/fa";
import css from "./SearchBar.module.css";

function SearchBar({ onSearch }) {
  const inpId = useId();
  
  const handleSubmit = (e) => {
     e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.search.value.toLowerCase();
    if (searchQuery.trim().length === 0) {
       toast("Oh, no! You didn't type any letter!", {
        icon: <FaExclamationCircle size="24" />,
      });
			// alert("Please enter search term!")
			return;
		}
    onSearch(searchQuery);
    form.reset();
  };

  
  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="search"
            id={inpId}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            aria-label="Searhing imput"
          />
          <button className={css.btn} type="submit">Search</button>
        </form>
      </header>
    </>
  );
}

export default SearchBar