const Button = ({ children, onClick, style = {}, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "0.6rem 1.2rem",
        backgroundColor: "#8b5cf6",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
  
  export default Button;
  