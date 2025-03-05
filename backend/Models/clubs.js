import mongoose from "mongoose";

const clubsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  department: {
    type: String,
  },
  description: {
    type: String,
  },

  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Clubadmin",
  },

  adminVerified: {
    type: Boolean,
    default: false,
  },

  profilePicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dbqlchapr/image/upload/v1734751266/default_upjx2z.jpg",
  },
  coverPicture: {
    type: String,
    default:
      "https://res.cloudinary.com/dbqlchapr/image/upload/v1734751395/cover_xo33gz.png",
  },

  contact: {
    phone: {
      type: Number,
    },
    email: {
      type: String,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    insta: {
      type: String,
    },
  },

  notices: {
    type: mongoose.Types.ObjectId,
    ref: "Notice",
  },

  formLink: {
    type: String,
  },
  ourTeam: {
    firstPerson: {
      name: {
        type: String,
      },
      post: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    secondPerson: {
      name: {
        type: String,
      },
      post: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
    thirdPerson: {
      name: {
        type: String,
      },
      post: {
        type: String,
      },
      description: {
        type: String,
      },
      image: {
        type: String,
      },
    },
  },
},
{ timestamps: true }
);

const Club = mongoose.model("Club", clubsSchema);

export default Club;
