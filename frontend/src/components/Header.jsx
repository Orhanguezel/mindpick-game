// src/components/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getStoredUser, setStoredUser } from "../utils/localStorage";

const Header = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    setStoredUser(null);
    navigate("/login");
  };

  return (
    <header className="site-header">
      <h2>🧠 MindPick</h2>
      <nav>
        <Link to="/questions">Quiz</Link>
        <Link to="/results">Ergebnisse</Link>
        <Link to="/answers">Antworten</Link>

        {user ? (
          <>
            <span style={{ marginLeft: "1.5rem", fontWeight: "bold" }}>
              👋 {user.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "1rem",
                background: "#fff",
                color: "#8b5cf6",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Abmelden
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginLeft: "1rem" }}>
              Login
            </Link>
            <Link to="/register" style={{ marginLeft: "1rem" }}>
              Registrieren
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
