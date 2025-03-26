import React from "react";

const Answer = ({ answer, isCorrect, feedback }) => {
  if (isCorrect === undefined) return null;

  const resultStyle = {
    padding: "1rem",
    marginTop: "1rem",
    borderRadius: "8px",
    color: isCorrect ? "#155724" : "#721c24",
    backgroundColor: isCorrect ? "#d4edda" : "#f8d7da",
    border: `1px solid ${isCorrect ? "#c3e6cb" : "#f5c6cb"}`,
  };

  return (
    <div style={resultStyle}>
      <h3>
        Deine Antwort: <span style={{ fontWeight: "bold" }}>{answer}</span>
      </h3>
      <p>
        {isCorrect ? "✅ Richtig!" : "❌ Falsch!"}
      </p>
      {feedback && <p style={{ marginTop: "0.5rem", fontStyle: "italic" }}>{feedback}</p>}
    </div>
  );
};

export default Answer;
