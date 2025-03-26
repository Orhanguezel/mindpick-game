import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import User from "../models/User.js";

export const submitAnswer = async (req, res) => {
  try {
    const { questionId, selectedOption, userId } = req.body;

   
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: "Frage nicht gefunden." });


    const isCorrect = question.correctOption === selectedOption;


    const answer = new Answer({
      questionId,
      selectedOption,
      isCorrect,
      userId,
    });

    await answer.save();

   
    if (isCorrect && userId) {
      await User.findByIdAndUpdate(userId, { $inc: { score: 1 } });
    }

    res.status(201).json({
      message: "Antwort gespeichert.",
      isCorrect,
    });
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Speichern der Antwort", error });
  }
};

