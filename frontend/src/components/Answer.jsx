import React, { useEffect, useState } from "react";

const QuizSummary = ({ quizFinished, user }) => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (quizFinished && user) {
      // Leaderboard
      fetch("http://localhost:5011/api/users")
        .then((res) => res.json())
        .then((data) =>
          setLeaderboard(data.sort((a, b) => b.score - a.score))
        );

      // Kullanıcının cevapları
      fetch(`http://localhost:5011/api/answers/${user._id}`)
        .then((res) => res.json())
        .then(setUserAnswers)
        .catch(() =>
          alert("Fehler beim Laden der Antwortübersicht.")
        );
    }
  }, [quizFinished]);

  if (!quizFinished) return null;

  return (
    <div style={{ padding: "2rem" }}>
      <hr style={{ margin: "2rem 0" }} />

      <h3>🏆 Bestenliste</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {leaderboard.map((u, index) => (
          <li key={u._id}>
            {index + 1}. {u.username}: <strong>{u.score} Punkte</strong>
            {u._id === user._id && " 👈 (Du)"}
          </li>
        ))}
      </ul>

      <hr style={{ margin: "2rem 0" }} />
      <h3>📋 Deine Antworten:</h3>

      {userAnswers.length === 0 ? (
        <p style={{ color: "gray" }}>❗ Du hast noch keine Antworten abgegeben.</p>
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

export default QuizSummary;
