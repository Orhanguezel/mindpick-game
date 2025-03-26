import { useEffect, useState } from "react";
import { getRandomQuestion, sendAnswer } from "../services/questionService";

const Question = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRandomQuestion()
      .then(setQuestion)
      .finally(() => setLoading(false));
  }, []);

  const handleAnswer = (selected) => {
    sendAnswer({ questionId: question._id, selectedOption: selected })
      .then(() => alert("Antwort gespeichert!"))
      .catch(() => alert("Fehler beim Speichern!"));
  };

  if (loading) return <p>Wird geladen...</p>;

  return (
    <div>
      <h2>{question.text}</h2>
      {question.options.map((opt, index) => (
        <button key={index} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Question;
