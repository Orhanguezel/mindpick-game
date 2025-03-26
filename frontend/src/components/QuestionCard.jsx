import React, { useEffect, useState } from "react";
import { getRandomQuestion, sendAnswer } from "../services/questionService";
import Answer from "./Answer";
import "./QuestionCard.css"; // Importiere die CSS-Datei

const QuestionCard = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(undefined);
  const [feedback, setFeedback] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(10); // Beispielanzahl
  const [points, setPoints] = useState(0);

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
    setSelectedAnswer(selected);
    try {
      const response = await sendAnswer({
        questionId: question._id,
        selectedOption: selected,
      });
      setIsCorrect(response.isCorrect);
      setFeedback(response.feedback);
      if (response.isCorrect) {
        setPoints(points + 1); // Annahme: 1 Punkt pro richtige Antwort
      }
    } catch (error) {
      console.error("Fehler beim Senden der Antwort:", error);
      alert("Fehler beim Senden der Antwort.");
      setIsCorrect(null);
      setFeedback("Fehler beim Senden der Antwort.");
    }
  };

  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
    setSelectedAnswer(null);
    setIsCorrect(undefined);
    setFeedback(null);
    fetchQuestion();
  };

  if (loading) return <p>Laden...</p>;

  return (
    <div className="question-card">
      <div className="progress-bar">
        Fortschritt: {questionNumber} / {totalQuestions}
      </div>
      <h2>{question.text}</h2>
      <div className="options">
        {question.options.map((opt, index) => (
          <button key={index} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {selectedAnswer && (
        <Answer answer={selectedAnswer} isCorrect={isCorrect} feedback={feedback} />
      )}
      {selectedAnswer && questionNumber < totalQuestions && (
        <button onClick={nextQuestion}>Nächste Frage</button>
      )}
      <div className="points">Punkte: {points}</div>
    </div>
  );
};

export default QuestionCard;