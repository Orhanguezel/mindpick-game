// src/pages/Register.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5011/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrierung fehlgeschlagen");
        return;
      }

      setMessage("Registrierung erfolgreich! Du wirst weitergeleitet...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Netzwerkfehler oder Server nicht erreichbar.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registrieren</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Registrieren</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};

export default Register;
