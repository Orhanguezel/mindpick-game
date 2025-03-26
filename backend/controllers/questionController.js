import Question from "../models/Question.js";

export const getRandomQuestion = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(randomIndex);

    if (!question) return res.status(404).json({ message: "Keine Frage gefunden." });

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Frage", error });
  }
};


export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Fragen", error });
  }
};


export const createQuestion = async (req, res) => {
  try {
    const { text, options, correctOption } = req.body;

    // Validation
    if (!options.includes(correctOption)) {
      return res.status(400).json({ message: "Die richtige Antwort muss eine der Optionen sein." });
    }

    const newQuestion = new Question({ text, options, correctOption });
    await newQuestion.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen der Frage", error });
  }
};

