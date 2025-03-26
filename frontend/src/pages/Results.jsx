import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/userService";
import { getStoredUser } from "../utils/localStorage";
import "../styles/Results.css";

const Results = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const stored = getStoredUser();

  useEffect(() => {
    if (!stored) return;

    getAllUsers()
      .then((data) => {
        const sorted = data.sort((a, b) => b.score - a.score);
        setUsers(sorted);
        const matched = sorted.find((u) => u._id === stored._id);
        setCurrentUser(matched || stored);
      })
      .catch(() => alert("Fehler beim Laden der Benutzerliste."))
      .finally(() => setLoading(false));
  }, [stored]);

  if (!stored) {
    return (
      <div className="results-container">
        <h2>⚠️ Bitte logge dich zuerst ein.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="results-container">
        <p>⏳ Ergebnisse werden geladen...</p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <h2>📊 Ergebnisübersicht</h2>

      {currentUser && (
        <div className="result-box">
          <h3>🧍 Dein Ergebnis:</h3>
          <p>
            <strong>{currentUser.username}</strong>:{" "}
            <span>{currentUser.score} Punkte</span>
          </p>
        </div>
      )}

      <div>
        <h3>🏆 Bestenliste:</h3>
        <ol className="ranking-list">
          {users.map((u) => {
            const isCurrent = u._id === currentUser?._id;
            return (
              <li
                key={u._id}
                className={`ranking-item ${isCurrent ? "highlight" : ""}`}
              >
                {u.username}: {u.score} Punkte
                {isCurrent && " 👈 (Du)"}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Results;
