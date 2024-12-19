const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club", 
    required: true,
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
},{collection:"questions"});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
