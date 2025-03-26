import { useEffect, useState } from "react";

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]); // ✅

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5011/api/questions")
      .then((res) => res.json())
      .then(setQuestions)
      .catch(() => setFeedback("Fehler beim Laden der Fragen."));
  }, []);

  useEffect(() => {
    if (quizFinished) {
      fetch("http://localhost:5011/api/users")
        .then((res) => res.json())
        .then((data) =>
          setLeaderboard(data.sort((a, b) => b.score - a.score))
        )
        .catch(() => alert("Fehler beim Laden der Bestenliste."));
    }
  }, [quizFinished]);

  const handleAnswer = async (selected) => {
    if (!user) {
      alert("Bitte zuerst einloggen!");
      return;
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = selected === currentQuestion.correctOption;

    try {
      await fetch("http://localhost:5011/api/answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion._id,
          userId: user._id,
          selectedOption: selected,
        }),
      });

      setAnswered(true);
      setFeedback(isCorrect ? "✅ Richtig!" : "❌ Falsch!");
      if (isCorrect) setScore((prev) => prev + 1);
    } catch (error) {
      alert("Fehler beim Speichern der Antwort.");
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setAnswered(false);
      setFeedback("");
    } else {
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) return <p>Lade Fragen...</p>;

  if (quizFinished) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Quiz beendet ✅</h2>
        <p>
          Dein Ergebnis: <strong>{score} von {questions.length}</strong>
        </p>

        <hr style={{ margin: "2rem 0" }} />
        <h3>🏆 Bestenliste</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {leaderboard.map((u, index) => (
            <li key={u._id} style={{ margin: "0.5rem 0" }}>
              {index + 1}. {u.username}: <strong>{u.score} Punkte</strong>
              {u._id === user?._id && " 👈 (Du)"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ padding: "2rem" }}>
      <h3>Frage {currentIndex + 1} / {questions.length}</h3>
      <h2>{currentQuestion.text}</h2>
      <div style={{ marginTop: "1rem" }}>
        {currentQuestion.options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(opt)}
            disabled={answered}
            style={{ margin: "0.5rem" }}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <p style={{ marginTop: "1rem" }}>{feedback}</p>}
      {answered && (
        <button onClick={nextQuestion} style={{ marginTop: "1rem" }}>
          Nächste Frage
        </button>
      )}
    </div>
  );
};

export default Question;
