import mongoose from "mongoose";
import "dotenv/config";
import connect from "./utils/connect.js";
import Answer from "./models/Answer.js";
import Question from "./models/Question.js";
import User from "./models/User.js";

async function seedAnswers() {
  await connect();
  await Answer.deleteMany();

  const users = await User.find();
  const questions = await Question.find();

  if (!users.length || !questions.length) {
    console.log("keine Benutzer oder Fragen gefunden!");
    return;
  }

  for (const user of users) {
    let userScore = 0;

    for (const question of questions) {
      const selected = question.options[Math.floor(Math.random() * 4)];
      const isCorrect = selected === question.correctOption;

      const answer = new Answer({
        questionId: question._id,
        userId: user._id,
        selectedOption: selected,
        isCorrect,
      });

      await answer.save();

      if (isCorrect) userScore++;
    }

    // ✅ Toplam puanı kullanıcıya yaz
    await User.findByIdAndUpdate(user._id, { score: userScore });
  }

  console.log("answers created and saved successfully!");
  await mongoose.connection.close();
}

seedAnswers();
