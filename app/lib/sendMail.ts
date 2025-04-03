import nodemailer from "nodemailer";

type MailOptions = {
  email: string; // Renamed from 'recipient' to 'email'
  subject: string;
  html: string; // Renamed from 'body' to 'html'
};

export const sendMail = async ({ email, subject, html }: MailOptions) => {
  const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

  if (!EMAIL_USERNAME || !EMAIL_PASSWORD) {
    throw new Error("Missing required environment variables.");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: {
      name: "Puffy Roll", 
      address: EMAIL_USERNAME, 
    },
    to: email, // Updated to use 'email' field
    subject: subject,
    html: html, // Updated to use 'html' field
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email via Gmail:", error);
    throw error;
  }
};

export default sendMail;
