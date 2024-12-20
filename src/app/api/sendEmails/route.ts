import nodemailer from 'nodemailer';
import VerificationEmail from "../../../../emails/VerificationEmail";
import { ApiResponse } from '@/types/ApiResponse';
import { renderToStaticMarkup } from 'react-dom/server';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Change to your email service provider if needed
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    // Render the React component to HTML
    const emailContent = renderToStaticMarkup(
      VerificationEmail({ username, otp: verifyCode })
    );

    // Send the email
    await transporter.sendMail({
      from: `"Mystery Message" <${process.env.EMAIL_USER}>`, // Sender address
      to: email, // Recipient email
      subject: 'Mystery Message Verification Code', // Email subject
      html: emailContent, // HTML email content
    });

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError: any) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
