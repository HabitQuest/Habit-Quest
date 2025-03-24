import prisma from "@/app/lib/prisma";

export async function PUT(request) {
  const { userId } = await request.json();

  try {
    const updatedHabits = await prisma.habit.updateMany({
      where: { userId },
      data: {
        isThumbsUp: false,
        isThumbsDown: false,
      },
    });

    // Fetch all updated habits
    const habits = await prisma.habit.findMany({
      where: { userId },
      orderBy: { time: "asc" },
    });

    return new Response(JSON.stringify(habits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error resetting habits:", error);
    return new Response(JSON.stringify({ error: "Failed to reset habits" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
