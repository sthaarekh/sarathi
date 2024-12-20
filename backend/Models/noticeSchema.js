import mongoose from "mongoose";
const noticeSchema = new mongoose.Schema({
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;
