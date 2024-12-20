// api/users/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

interface UserResponse {
  success: boolean;
  users?: string[];
  message?: string;
}

export async function GET(): Promise<NextResponse<UserResponse>> {
  await dbConnect();

  try {
    // Fetch all users' usernames from the database
    const users = await UserModel.find({}, 'username').exec();

    // If no users are found, return an error
    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No users found' },
        { status: 404 }
      );
    }

    // Return list of usernames
    const usernames = users.map((user) => user.username);
    return NextResponse.json({ success: true, users: usernames }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching users' },
      { status: 500 }
    );
  }
}
