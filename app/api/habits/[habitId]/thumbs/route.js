import prisma from "@/app/lib/prisma";

export async function PUT(request, { params }) {
  const { habitId } = params;
  const { isThumbsUp, isThumbsDown } = await request.json();

  try {
    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
      include: { user: true },
    });

    if (!habit) {
      console.error("Habit not found:", habitId);
      return new Response("Habit not found", { status: 404 });
    }

    // Calculate streak changes
    let newStreak = habit.streak || 0;
    let lastCompleted = habit.lastCompleted;

    if (isThumbsUp) {
      // Increment streak on thumbs up
      newStreak = newStreak + 1;
      lastCompleted = new Date().toISOString();
    } else if (isThumbsDown) {
      // Reset streak on thumbs down
      newStreak = 0;
    }

    console.log("Updating streak:", {
      habitId,
      oldStreak: habit.streak,
      newStreak,
      lastCompleted,
    });

    // Calculate XP change
    let xpChange = 0;
    if (isThumbsUp) {
      xpChange = 10;
    } else if (isThumbsDown) {
      xpChange = -5;
    }

    // If user is at level 1 with no XP and thumbs down is hit, don't apply the XP change
    if (
      isThumbsDown &&
      habit.user.overallLevel === 1 &&
      habit.user.overallEXP === 0
    ) {
      xpChange = 0;
    }

    let newXP = habit.user.overallEXP + xpChange;
    let newLevel = habit.user.overallLevel;

    if (newXP >= 100) {
      newLevel += 1;
      newXP -= 100;
    } else if (newXP < 0) {
      newLevel = Math.max(1, newLevel - 1);
      newXP = Math.max(0, newXP + 100);
    }

    // Update user first
    const updatedUser = await prisma.user.update({
      where: { id: habit.userId },
      data: {
        overallEXP: newXP,
        overallLevel: newLevel,
      },
    });

    // Then update habit with streak information
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        isThumbsUp,
        isThumbsDown,
        streak: newStreak,
        lastCompleted,
      },
    });

    console.log("Updated habit:", updatedHabit);

    return new Response(JSON.stringify(updatedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to update habit",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
