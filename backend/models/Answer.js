import { model, Schema, Types } from "mongoose";

const answerSchema = new Schema({
  questionId: {
    type: Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedOption: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: null,
  },
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

export default model("Answer", answerSchema);
