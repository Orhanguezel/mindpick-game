import React, { useEffect, useState } from "react";
import { getUserAnswers } from "../services/answerService";
import { getStoredUser } from "../utils/localStorage";

const Answer = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    if (!user) return;

    getUserAnswers(user._id)
      .then(setUserAnswers)
      .catch(() => alert("Fehler beim Laden der Antwortübersicht."))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>⚠️ Bitte logge dich zuerst ein.</h2>
      </div>
    );
  }

  if (loading) {
    return <p style={{ padding: "2rem" }}>⏳ Antworten werden geladen...</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📋 Deine Antworten</h2>

      {userAnswers.length === 0 ? (
        <p style={{ color: "gray" }}>
          ❗ Du hast noch keine Antworten abgegeben.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {userAnswers.map((ans, index) => (
            <li key={index} style={{ marginBottom: "1rem" }}>
              <strong>Frage:</strong> {ans.question} <br />
              <strong>Deine Antwort:</strong>{" "}
              <span style={{ color: ans.isCorrect ? "green" : "red" }}>
                {ans.selectedOption}
              </span>
              <br />
              {!ans.isCorrect && (
                <span>
                  <strong>Richtige Antwort:</strong> {ans.correctOption}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Answer;

