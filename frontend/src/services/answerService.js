const BASE_URL = import.meta.env.VITE_API_URL;

export const sendAnswer = async (payload) => {
  const res = await fetch(`${BASE_URL}/answers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Fehler beim Senden der Antwort");
  return res.json();
};

export const getUserAnswers = async (userId) => {
    const res = await fetch(`${BASE_URL}/answers/${userId}`);
    if (!res.ok) throw new Error("Fehler beim Laden der Antworten");
    return await res.json();
  };
  
  
