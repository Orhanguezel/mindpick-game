import Answer from "../models/Answer.js";

export const submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;
    const answer = new Answer({ questionId, selectedOption });
    await answer.save();
    res.status(201).json({ message: "Antwort gespeichert." });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern der Antwort", error });
  }
};
