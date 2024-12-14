import nodemailer from "nodemailer";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail2(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Configure the transporter with Gmail SMTP server details
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jadhavsushant379@gmail.com", // Your Gmail address
        pass: "puxi prlh bfoh xjww", // Replace with your Gmail app password
      },
    });

    // HTML content for the email, using the VerificationEmail component
    const emailHtml: any = VerificationEmail({ username, otp: verifyCode });

    // Send the email
    const info = await transporter.sendMail({
      from: '"Mystery Message" <jadhavsushant3792@gmail.com>', // sender address
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
