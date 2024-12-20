import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all usernames from the User collection
    const users = await UserModel.find({}).select("username -_id");

    // Return the usernames in the response
    return NextResponse.json({
      success: true,
      data: users.map((user) => user.username),
    });
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch usernames",
      },
      { status: 500 }
    );
  }
}
