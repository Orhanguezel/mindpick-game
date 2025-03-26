const BASE_URL = import.meta.env.VITE_API_URL;

export const getAllUsers = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Fehler beim Laden der Benutzerliste");
  return res.json();
};

export const getUserScore = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/score`);
  if (!res.ok) throw new Error("Fehler beim Laden des Punktestands");
  return res.json();
};

export const registerUser = async (payload) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Registrierung fehlgeschlagen");
  return res.json();
};

export const loginUser = async (payload) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Login fehlgeschlagen");
  return res.json();
};

export const getLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

