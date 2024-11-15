import nodemailer from "nodemailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Configure the transporter with SMTP server details
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", // Replace with your SMTP host for production
      port: 587,
      secure: false, // Set to true for port 465, false for 587
      auth: {
        user: "maddison53@ethereal.email", // Replace with actual user
        pass: "jn7jnAPss4f63QBp6D", // Replace with actual password
      },
    });

    // HTML content for the email, using the VerificationEmail component
    const emailHtml: any = VerificationEmail({ username, otp: verifyCode });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Mystery Message" <truefeedback.com>', // sender address
      to: email, // recipient email
      subject: "Mystery Message Verification Code", // email subject
      html: emailHtml, // HTML body generated by VerificationEmail component
    });

    console.log("Verification email sent: %s", info.messageId);
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}