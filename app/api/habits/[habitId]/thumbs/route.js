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
      return new Response("Habit not found", { status: 404 });
    }

    // If habit is already in the desired state, do nothing
    if (
      habit.isThumbsUp === isThumbsUp &&
      habit.isThumbsDown === isThumbsDown
    ) {
      return new Response("No status change", { status: 200 });
    }

    // Calculate XP change
    let xpChange = 0;
    if (isThumbsUp) xpChange = 10;
    if (isThumbsDown) xpChange = -5;

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

    // Update class stats based on habit type
    let classStatsUpdate = {};
    if (isThumbsUp) {
      switch (habit.habitType) {
        case "Physical":
          classStatsUpdate = {
            warriorEXP: habit.user.warriorEXP + 10,
            warriorLevel: habit.user.warriorLevel,
          };
          if (classStatsUpdate.warriorEXP >= 100) {
            classStatsUpdate.warriorLevel += 1;
            classStatsUpdate.warriorEXP -= 100;
          }
          break;
        case "Mental":
          classStatsUpdate = {
            mageEXP: habit.user.mageEXP + 10,
            mageLevel: habit.user.mageLevel,
          };
          if (classStatsUpdate.mageEXP >= 100) {
            classStatsUpdate.mageLevel += 1;
            classStatsUpdate.mageEXP -= 100;
          }
          break;
        case "Swift":
          classStatsUpdate = {
            rogueEXP: habit.user.rogueEXP + 10,
            rogueLevel: habit.user.rogueLevel,
          };
          if (classStatsUpdate.rogueEXP >= 100) {
            classStatsUpdate.rogueLevel += 1;
            classStatsUpdate.rogueEXP -= 100;
          }
          break;
        default:
          break;
      }
    }

    const updatedUserData = {
      overallEXP: newXP,
      overallLevel: newLevel,
      ...classStatsUpdate,
    };

    await prisma.user.update({
      where: { id: habit.userId },
      data: updatedUserData,
    });

    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        isThumbsUp,
        isThumbsDown,
      },
    });

    return new Response(JSON.stringify(updatedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit thumbs state:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update habit thumbs state" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
