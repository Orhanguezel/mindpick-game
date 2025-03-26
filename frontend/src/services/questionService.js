// src/services/questionService.js

const API_URL = import.meta.env.VITE_API_URL;

export const getRandomQuestion = async () => {
  const res = await fetch(`${API_URL}/questions/random`);
  if (!res.ok) throw new Error("Fehler beim Laden der Frage");
  return await res.json();
};

export const sendAnswer = async ({ questionId, selectedOption, userId }) => {
  const res = await fetch(`${API_URL}/answers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questionId, selectedOption, userId }),
  });

  if (!res.ok) throw new Error("Fehler beim Senden der Antwort");
  return await res.json(); 
};



