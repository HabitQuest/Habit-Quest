import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(request) {
  const { userId, userCharacter } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { userCharacter },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user character" },
      { status: 500 }
    );
  }
}
