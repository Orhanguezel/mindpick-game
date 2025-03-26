// src/services/questionService.js
import request from "./api";

export const getRandomQuestion = async () => {
  try{  
  return await request("/questions/random");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendAnswer = async (answerData) => {
  try {  
  return await request("/answers", "POST", answerData);
} catch (error) {
  console.error(error);
  
}
};

export const getAllAnswers = async () => {
  try {
    return await request("/answers")
  } catch (error) {
    console.error(error);
  }
};

export const deleteAnswer = async (questionId) => {
  try {
    return await request(`/answer/${questionId}`, "DELETE");
  } catch (error) {
    console.error(error)
  }
};



// try/catch soll hinzugefügt werden
