import css from "./ErrorMessage.module.css";

function ErrorMessage({ error} ) {


  return (
    <main>
     <p className={css.text}>Ooops! {error.message}!</p>;  
    </main>
  )
}

export default ErrorMessage

