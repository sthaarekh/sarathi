import mongoose from "mongoose";
const clubsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  adminVerified: {
    type: Boolean,
  },
});

const Club = mongoose.model("Club", clubsSchema);

export default Club;
