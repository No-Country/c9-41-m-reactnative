import s from "./Button.module.css";

function Button({ type, text, style, onClick, id }) {
  return (
    <button
      className={`${s.boton} ${style || null}`}
      type={type}
      onClick={onClick || null}
      id={id || null}
    >
      {text}
    </button>
  );
}

export default Button;
