// src/pages/Home.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStartQuiz = () => {
    navigate("/questions");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Willkommen bei MindPick!</h1>
      <p>Starte dein Quiz und teste dein Wissen!</p>

      <div style={{ marginTop: "2rem" }}>
        {user ? (
          <>
            <p>👋 Willkommen, <strong>{user.username}</strong>!</p>
            <button onClick={handleStartQuiz}>Quiz starten</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button style={{ marginRight: "1rem" }}>Einloggen</button>
            </Link>
            <Link to="/register">
              <button>Registrieren</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
