import { ApiResponse } from '@/types/ApiResponse';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email, username, verifyCode } = await request.json();

    // Validate inputs
    if (!email || !username || !verifyCode) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Example: Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (or App Password)
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      html: `
        <h1>Hello, ${username}!</h1>
        <p>Your verification code is: <strong>${verifyCode}</strong></p>
        <p>Please use this code to complete your signup.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
  }
}
