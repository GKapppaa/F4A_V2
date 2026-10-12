import '../../styles/atoms/Boton.css'

function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`atom-button ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;
