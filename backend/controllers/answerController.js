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


export const getUserAnswers = async (req, res) => {
  try {
    const { userId } = req.params;
    const answers = await Answer.find({ userId }).populate("questionId");

    const formatted = answers.map((ans) => ({
      question: ans.questionId?.text,
      correctOption: ans.questionId?.correctOption,
      selectedOption: ans.selectedOption,
      isCorrect: ans.selectedOption === ans.questionId?.correctOption,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Antworten.", error });
  }
};



