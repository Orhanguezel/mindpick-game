import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length === 4;
      },
      message: props => `Es müssen genau 4 Antwortoptionen sein.`,
    },
  },
  correctOption: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return this.options.includes(v);
      },
      message: props => `"${props.value}" ist keine gültige Option.`,
    },
  },
}, { timestamps: true });

export default model("Question", questionSchema);
