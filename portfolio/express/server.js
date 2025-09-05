import express from "express";
import nodemailer from "nodemailer";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Tạo transporter cho Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSKEY,
  },
});

// Gửi tin nhắn Telegram
async function sendTelegramMessage(token, chat_id, message) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  try {
    const res = await axios.post(url, {
      text: message,
      chat_id,
    });
    return res.data.ok;
  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
    return false;
  }
}

// Endpoint API
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const formattedMessage = `📩 New message from ${name}\n\nEmail: ${email}\n\nMessage:\n${message}`;

  try {
    // Gửi email
    await transporter.sendMail({
      from: "Portfolio",
      to: process.env.EMAIL_ADDRESS,
      subject: `New Message From ${name}`,
      text: formattedMessage,
      replyTo: email,
    });

    // Gửi Telegram
    // const telegramSuccess = await sendTelegramMessage(
    //   process.env.TELEGRAM_BOT_TOKEN,
    //   process.env.TELEGRAM_CHAT_ID,
    //   formattedMessage
    // );

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    //   telegram: telegramSuccess,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
