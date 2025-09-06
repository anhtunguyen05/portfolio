import express from "express";
import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

// API routes phải được định nghĩa TRƯỚC static files
// Endpoint API
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: name, email, message",
    });
  }

  const msg = {
    to: process.env.TO_EMAIL, // Email nhận
    from: process.env.FROM_EMAIL, // Email gửi (đã verify trong SendGrid)
    subject: `New message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    replyTo: email,
  };

  try {
    console.log("📤 Attempting to send email...");
    console.log("📧 From:", process.env.FROM_EMAIL);
    console.log("📧 To:", process.env.TO_EMAIL);

    await sgMail.send(msg);
    console.log("✅ Email sent successfully!");

    res
      .status(200)
      .json({ success: true, message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("❌ SendGrid Error:", error.message);
    res.status(500).json({
      success: false,
      message: "❌ Failed to send email",
      error: error.message,
    });
  }
});

// serve React build
// Serve static files từ folder dist
app.use(express.static(path.join(__dirname, "../dist")));

// React Router fallback (cho SPA) - phải để cuối cùng
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Tạo transporter cho Nodemailer
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_ADDRESS,
//     pass: process.env.GMAIL_PASSKEY,
//   },
// });

// Cấu hình SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Gửi tin nhắn Telegram
// async function sendTelegramMessage(token, chat_id, message) {
//   const url = `https://api.telegram.org/bot${token}/sendMessage`;
//   try {
//     const res = await axios.post(url, {
//       text: message,
//       chat_id,
//     });
//     return res.data.ok;
//   } catch (error) {
//     console.error("Telegram error:", error.response?.data || error.message);
//     return false;
//   }
// }

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
