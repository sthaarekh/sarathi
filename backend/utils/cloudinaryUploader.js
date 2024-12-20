import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "sarathi",
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export default uploadToCloudinary;
