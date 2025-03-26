import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomQuestion, sendAnswer } from "../services/questionService";
import { getStoredUser } from "../utils/localStorage";
import "../styles/QuestionCard.css";

// Alt bileşen: Soru sonrası geri bildirim
const SelectedAnswerFeedback = ({ answer, isCorrect, feedback }) => {
  if (isCorrect === undefined) return null;

  return (
    <div className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
      <strong>Deine Antwort:</strong> {answer}
      <br />
      {feedback && <span>{feedback}</span>}
    </div>
  );
};

const QuestionCard = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [feedback, setFeedback] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [points, setPoints] = useState(0);
  const totalQuestions = 10;

  const user = getStoredUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const fetched = await getRandomQuestion();
      setQuestion(fetched);
    } catch (err) {
      console.error("Fehler beim Laden der Frage:", err);
      alert("Fehler beim Laden der Frage.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (selected) => {
    if (!user) {
      alert("Bitte logge dich zuerst ein.");
      return;
    }

    setSelectedAnswer(selected);

    try {
      const res = await sendAnswer({
        questionId: question._id,
        selectedOption: selected,
        userId: user._id,
      });

      setIsCorrect(res.isCorrect);
      setFeedback(res.feedback || (res.isCorrect ? "✅ Richtig!" : "❌ Falsch!"));

      if (res.isCorrect) setPoints((prev) => prev + 1);
    } catch (err) {
      console.error("Antwortfehler:", err);
      setFeedback("Fehler beim Senden.");
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= totalQuestions) {
      navigate("/results");
      return;
    }

    setQuestionNumber((prev) => prev + 1);
    setSelectedAnswer(null);
    setIsCorrect(undefined);
    setFeedback(null);
    fetchQuestion();
  };

  if (loading || !question) {
    return <p className="loading-text">⏳ Frage wird geladen...</p>;
  }

  return (
    <div className="question-card">
      <div className="progress-bar">
        Frage {questionNumber} von {totalQuestions}
      </div>

      <h2>{question.text}</h2>

      <div className="options">
        {question.options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(opt)}
            disabled={!!selectedAnswer}
          >
            {opt}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <>
          <SelectedAnswerFeedback
            answer={selectedAnswer}
            isCorrect={isCorrect}
            feedback={feedback}
          />
          <button className="next-btn" onClick={nextQuestion}>
            Nächste Frage
          </button>
        </>
      )}

      <div className="points">Punkte: {points}</div>
    </div>
  );
};

export default QuestionCard;
