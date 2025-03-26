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

    // Calculate XP changes
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

    // Calculate class-specific XP and level changes
    let classUpdates = {};
    if (habit.habitType === "Mental") {
      let newMageXP = habit.user.mageEXP + xpChange;
      let newMageLevel = habit.user.mageLevel;

      if (newMageXP >= 100) {
        newMageLevel += 1;
        newMageXP -= 100;
      } else if (newMageXP < 0) {
        newMageLevel = Math.max(1, newMageLevel - 1);
        newMageXP = Math.max(0, newMageXP + 100);
      }

      classUpdates = {
        mageEXP: newMageXP,
        mageLevel: newMageLevel,
      };
    } else if (habit.habitType === "Physical") {
      let newWarriorXP = habit.user.warriorEXP + xpChange;
      let newWarriorLevel = habit.user.warriorLevel;

      if (newWarriorXP >= 100) {
        newWarriorLevel += 1;
        newWarriorXP -= 100;
      } else if (newWarriorXP < 0) {
        newWarriorLevel = Math.max(1, newWarriorLevel - 1);
        newWarriorXP = Math.max(0, newWarriorXP + 100);
      }

      classUpdates = {
        warriorEXP: newWarriorXP,
        warriorLevel: newWarriorLevel,
      };
    } else if (habit.habitType === "Swift") {
      let newRogueXP = habit.user.rogueEXP + xpChange;
      let newRogueLevel = habit.user.rogueLevel;

      if (newRogueXP >= 100) {
        newRogueLevel += 1;
        newRogueXP -= 100;
      } else if (newRogueXP < 0) {
        newRogueLevel = Math.max(1, newRogueLevel - 1);
        newRogueXP = Math.max(0, newRogueXP + 100);
      }

      classUpdates = {
        rogueEXP: newRogueXP,
        rogueLevel: newRogueLevel,
      };
    }

    // Update user with both overall and class-specific changes
    const updatedUser = await prisma.user.update({
      where: { id: habit.userId },
      data: {
        overallEXP: newXP,
        overallLevel: newLevel,
        ...classUpdates,
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

    return new Response(
      JSON.stringify({ habit: updatedHabit, user: updatedUser }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
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
