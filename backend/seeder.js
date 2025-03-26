import mongoose from "mongoose";
import "dotenv/config";
import connect from "./utils/connect.js";
import Question from "./models/Question.js";

const questions = [
  {
    text: "Was ist die Hauptstadt von Deutschland?",
    options: ["München", "Berlin", "Hamburg", "Köln"],
    correctOption: "Berlin",
  },
  {
    text: "Welches Element hat das chemische Symbol 'O'?",
    options: ["Osmium", "Ozon", "Oxygen", "Oxid"],
    correctOption: "Oxygen",
  },
  {
    text: "Welche Sprache wird in Brasilien gesprochen?",
    options: ["Spanisch", "Portugiesisch", "Französisch", "Englisch"],
    correctOption: "Portugiesisch",
  },
  {
    text: "Wie viele Kontinente gibt es auf der Erde?",
    options: ["5", "6", "7", "8"],
    correctOption: "7",
  },
  {
    text: "Was ist das größte Tier der Welt?",
    options: ["Elefant", "Blauwal", "Krokodil", "Giraffe"],
    correctOption: "Blauwal",
  },
  {
    text: "Welche Farbe hat Chlorophyll?",
    options: ["Grün", "Blau", "Gelb", "Rot"],
    correctOption: "Grün",
  },
  {
    text: "Wer schrieb 'Faust'?",
    options: ["Goethe", "Schiller", "Kafka", "Hesse"],
    correctOption: "Goethe",
  },
  {
    text: "Wie viele Beine hat eine Spinne?",
    options: ["6", "8", "10", "12"],
    correctOption: "8",
  },
  {
    text: "In welchem Jahr endete der Zweite Weltkrieg?",
    options: ["1943", "1944", "1945", "1946"],
    correctOption: "1945",
  },
  {
    text: "Welcher Planet ist der Sonne am nächsten?",
    options: ["Venus", "Merkur", "Mars", "Jupiter"],
    correctOption: "Merkur",
  }
];

async function seedData() {
  await connect();


  await Question.deleteMany();


  await Question.insertMany(questions);

  console.log("✅ Fragen wurden erfolgreich gespeichert!");
  await mongoose.connection.close();
}

seedData();
