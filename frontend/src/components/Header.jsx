import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    }}>
      {/* Sol logo */}
      <div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.4rem", fontWeight: "bold" }}>
          🧠 MindPick
        </Link>
      </div>

      {/* Sağ navigasyon */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/questions" style={navStyle}>Questions</Link>
        <Link to="/answer" style={navStyle}>Answers</Link>
        <Link to="/results" style={navStyle}>Results</Link>

        {user && (
          <>
            <span style={{ fontSize: "0.9rem" }}>👤 {user.username}</span>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

const navStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const btnStyle = {
  backgroundColor: "#8b5cf6",
  color: "#fff",
  border: "none",
  padding: "0.5rem 0.8rem",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Header;
