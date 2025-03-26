import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStartQuiz = () => {
    if (!user) {
      alert("⚠️ Bitte logge dich ein, um das Quiz zu starten.");
      return;
    }

    navigate("/questions");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Willkommen bei <span style={{ color: "#8b5cf6" }}>MindPick</span> 🧠</h1>
      <p>Starte dein Quiz und teste dein Wissen!</p>

      <div style={{ marginTop: "2rem" }}>
        {user ? (
          <>
            <p>👋 Willkommen, <strong>{user.username}</strong>!</p>
            <button onClick={handleStartQuiz} style={btnStyle}>Quiz starten</button>
          </>
        ) : (
          <>
            <p style={{ marginBottom: "1rem" }}>🔐 Du musst dich zuerst einloggen.</p>
            <Link to="/login">
              <button style={{ ...btnStyle, marginRight: "1rem" }}>Einloggen</button>
            </Link>
            <Link to="/register">
              <button style={btnStyle}>Registrieren</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const btnStyle = {
  padding: "0.6rem 1.2rem",
  backgroundColor: "#8b5cf6",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  cursor: "pointer",
};

export default Home;
