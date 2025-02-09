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

const sendResetPasswordEmail = async (email, resetToken) => {
  if (!email || !resetToken) {
    throw new Error("Email and reset token are required");
  }

  const resetLink = `http://localhost:5001/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Reset Your Password",
    text: `Click the link to reset your password: ${resetLink}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
      <div style="text-align: center;">
        <h1 style="color: #ff5722;">Reset Your Password</h1>
        <p style="font-size: 18px; color: #555;">We received a request to reset your password.</p>
        <p style="font-size: 16px; color: #555;">Click the button below to proceed.</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #ff5722; color: #fff; text-decoration: none; padding: 15px 25px; font-size: 16px; border-radius: 5px; display: inline-block;">Reset Password</a>
      </div>
      <div style="text-align: center; color: #888;">
        <p>If you did not request this, please ignore this email.</p>
      </div>
      <footer style="text-align: center; margin-top: 20px; color: #aaa; font-size: 12px;">
        <p>sarathi &copy; ${TodayDate}</p>
        <p>28 Kilo, Dhulikhel, Kathmandu University</p>
      </footer>
    </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export default sendResetPasswordEmail;
