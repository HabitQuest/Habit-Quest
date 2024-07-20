import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(request) {
  const { userId, userClass } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { userClass },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user class" },
      { status: 500 }
    );
  }
}
