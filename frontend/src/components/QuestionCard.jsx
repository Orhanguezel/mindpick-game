import React, { useEffect, useState } from "react";
import { getRandomQuestion, sendAnswer } from "../services/questionService";
import Answer from "./Answer";
import "./QuestionCard.css";
import { useNavigate } from "react-router-dom";

const QuestionCard = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [feedback, setFeedback] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const totalQuestions = 10;
  const [points, setPoints] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const fetchedQuestion = await getRandomQuestion();
      setQuestion(fetchedQuestion);
    } catch (error) {
      console.error("Fehler beim Laden der Frage:", error);
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
      const response = await sendAnswer({
        questionId: question._id,
        selectedOption: selected,
        userId: user._id,
      });

      setIsCorrect(response.isCorrect);
      setFeedback(response.feedback || (response.isCorrect ? "✅ Richtig!" : "❌ Falsch!"));

      if (response.isCorrect) {
        setPoints((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Fehler beim Senden der Antwort:", error);
      alert("Fehler beim Senden.");
      setIsCorrect(null);
      setFeedback("Fehler beim Senden.");
    }
  };

  const nextQuestion = () => {
    if (questionNumber >= totalQuestions) {
      navigate("/results"); // Quiz sonunda sonuç sayfasına yönlendir
      return;
    }

    setQuestionNumber((prev) => prev + 1);
    setSelectedAnswer(null);
    setIsCorrect(undefined);
    setFeedback(null);
    fetchQuestion();
  };

  if (loading) return <p>Laden...</p>;

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
          <Answer
            answer={selectedAnswer}
            isCorrect={isCorrect}
            feedback={feedback}
          />
          <button onClick={nextQuestion}>Nächste Frage</button>
        </>
      )}

      <div className="points">Punkte: {points}</div>
    </div>
  );
};

export default QuestionCard;
