import React, { useEffect, useState } from "react";

const Results = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(stored);

    fetch("http://localhost:5011/api/users")
      .then((res) => res.json())
      .then((data) => {
        // Skora göre sırala
        const sorted = data.sort((a, b) => b.score - a.score);
        setUsers(sorted);

        // Güncel kullanıcıyı listeden eşleştir
        const matched = sorted.find((u) => u._id === stored?._id);
        if (matched) setCurrentUser(matched);
      })
      .catch(() => alert("Fehler beim Laden der Benutzerdaten."));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📊 Ergebnisübersicht</h2>

      {currentUser && (
        <div style={{ marginBottom: "2rem", background: "#f0f0f0", padding: "1rem", borderRadius: "6px" }}>
          <h3>🧍 Dein Ergebnis:</h3>
          <p>
            <strong>{currentUser.username}</strong>: <span>{currentUser.score} Punkte</span>
          </p>
        </div>
      )}

      <div>
        <h3>🏆 Bestenliste:</h3>
        <ol>
          {users.map((user, index) => (
            <li key={user._id} style={{
              fontWeight: user._id === currentUser?._id ? "bold" : "normal",
              backgroundColor: user._id === currentUser?._id ? "#e0f7fa" : "transparent",
              padding: "6px",
              borderRadius: "4px"
            }}>
              {index + 1}. {user.username}: {user.score} Punkte
              {user._id === currentUser?._id && " 👈 (Du)"}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Results;
