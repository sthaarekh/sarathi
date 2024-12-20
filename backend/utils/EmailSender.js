import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:5000/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${verificationLink}`,
    html: `<p>Please click the following link to verify your email:</p><a href="${verificationLink}">Verify Email</a>`,
  };

  try {
    // Attempt to send email and log success
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info);
  } catch (error) {
    console.error("Error sending verification email:", error);
    // Log the error code and message for debugging
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error; // Rethrow to allow higher-level error handling
  }
};

export default sendVerificationEmail;
