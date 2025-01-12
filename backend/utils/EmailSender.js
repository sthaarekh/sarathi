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
const TodayDate = new Date().getFullYear();

const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `http://localhost:5000/verify/${verificationToken}`;

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${verificationLink}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
      <div style="text-align: center;">
        <h1 style="color: #4CAF4f;">Welcome to Sarathi!</h1>
        <p style="font-size: 18px; color: #555;">We are thrilled to have you onboard.</p>
        <p style="font-size: 16px; color: #555;">Please verify your email to complete your registration and proceed with setting up your club.</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationLink}" style="background-color: #4CAF4f; color: #fff; text-decoration: none; padding: 15px 25px; font-size: 16px; border-radius: 5px; display: inline-block;">Verify Email</a>
      </div>
      <div style="text-align: center; color: #888;">
        <p>If you did not sign up, please ignore this email.</p>
        <p style="font-size: 14px;">Need help? <a href="mailto:saimonbro00007@gmail.com" style="color: #4CAF4f; text-decoration: none;">Contact Support</a></p>
      </div>
      <footer style="text-align: center; margin-top: 20px; color: #aaa; font-size: 12px;">
        <p>sarathi © ${TodayDate}</p>
        <p>28 Kilo, Dhulikhel ,Kathmandu University</p>
      </footer>
    </div>
    <style>
      @media (max-width: 600px) {
        .container {
          padding: 15px;
        }
        .button {
          padding: 12px 20px;
          font-size: 14px;
        }
        .content p {
          font-size: 16px;
        }
        .footer p {
          font-size: 12px;
        }
      }
    </style>
  `,
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
