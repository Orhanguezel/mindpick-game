import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

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
    <div className="home-container">
      <h1>
        Willkommen bei <span className="highlight">MindPick</span> 🧠
      </h1>
      <p>Starte dein Quiz und teste dein Wissen!</p>

      <div className="home-actions">
        {user ? (
          <>
            <p>👋 Willkommen, <strong>{user.username}</strong>!</p>
            <button className="home-btn" onClick={handleStartQuiz}>
              Quiz starten
            </button>
          </>
        ) : (
          <>
            <p className="login-warning">🔐 Du musst dich zuerst einloggen.</p>
            <Link to="/login">
              <button className="home-btn">Einloggen</button>
            </Link>
            <Link to="/register">
              <button className="home-btn">Registrieren</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
