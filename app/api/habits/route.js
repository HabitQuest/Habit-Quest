import prisma from "@/app/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    // Get the user to check their last reset date
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastHabitReset: true },
    });

    const now = new Date();
    const lastReset = user?.lastHabitReset
      ? new Date(user.lastHabitReset)
      : null;
    const needsReset =
      !lastReset ||
      now.getDate() !== lastReset.getDate() ||
      now.getMonth() !== lastReset.getMonth() ||
      now.getFullYear() !== lastReset.getFullYear();

    if (needsReset) {
      // Reset all habits and update last reset date
      await prisma.habit.updateMany({
        where: { userId },
        data: {
          isThumbsUp: false,
          isThumbsDown: false,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          lastHabitReset: now,
        },
      });
    }

    // Get the updated habits
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        time: "asc",
      },
    });

    return new Response(JSON.stringify(habits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in habits GET:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch habits" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  try {
    const { habit, habitType, time, duration, userId } = await request.json();

    // Data validation (simple example)
    if (
      !userId ||
      typeof habit !== "string" ||
      !habit ||
      typeof habitType !== "string" ||
      !habitType
    ) {
      return new Response(JSON.stringify({ error: "Invalid input data" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const newHabit = await prisma.habit.create({
      data: {
        habit,
        habitType,
        time,
        duration: duration !== undefined ? duration : null,
        userId,
      },
    });

    return new Response(JSON.stringify(newHabit), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating new habit:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create new habit",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
