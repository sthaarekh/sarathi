import mongoose, { mongo } from "mongoose";

const noticeSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    image: {
      type: String,
    },
    club: {
      type: mongoose.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    reportCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Notice = new mongoose.model("Notice", noticeSchema);
export default Notice;
