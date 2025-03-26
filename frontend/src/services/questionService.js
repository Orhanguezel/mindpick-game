// src/services/questionService.js
import request from "./api";

export const getRandomQuestion = () => {
  return request("/questions/random");
};

export const sendAnswer = (answerData) => {
  return request("/answers", "POST", answerData);
};

export const getAllAnswers = () => {};

export const deleteAnswer = (questionId) => {};



// try/catch soll hinzugefügt werden
