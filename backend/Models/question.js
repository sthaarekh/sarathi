import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    FirstQuestion: {
      type: String,
      required: true,
    },
    FirstAnswer: {
      type: String,
      required: true,
    },
    SecondQuestion: {
      type: String,
      required: true,
    },
    SecondAnswer: {
      type: String,
      required: true,
    },
    ThirdQuestion: {
      type: String,
      required: true,
    },
    ThirdAnswer: {
      type: String,
      required: true,
    },
    FourthQuestion: {
      type: String,
      required: true,
    },
    FourthAnswer: {
      type: String,
      required: true,
    },
    FifthQuestion: {
      type: String,
      required: true,
    },
    FifthAnswer: {
      type: String,
      required: true,
    },
  },
  { collection: "questions" }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
