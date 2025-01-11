import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { email, newPassword } = await request.json();

    if (!email || !newPassword) {
      return Response.json(
        { success: false, message: "Email and new password are required" },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    return Response.json(
      { success: true, message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return Response.json(
      { success: false, message: "Error updating password" },
      { status: 500 }
    );
  }
}
