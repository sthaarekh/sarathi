import mongoose, { mongo, Types } from "mongoose";

const clubsSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Clubadmin",
    required: true,
  },
  notices: {
    types: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dbqlchapr/image/upload/v1734751266/default_upjx2z.jpg",
  },
  coverPicture: {
    type: String,
    required: true,
    default:
      "https://res.cloudinary.com/dbqlchapr/image/upload/v1734751395/cover_xo33gz.png",
  },
  contact: {
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
      required: true,
    },
    insta: {
      type: String,
      required: true,
    },
  },
  formLink: {
    type: String,
    required: true,
  },
  ourTeam: {
    firstPerson: {
      name: {
        type: String,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    secondPerson: {
      name: {
        type: String,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
    thirdPerson: {
      name: {
        type: String,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  },
});

const Club = mongoose.model("Club", clubsSchema);

export default Club;
