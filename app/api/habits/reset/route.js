import prisma from "@/app/lib/prisma";

export async function POST(request) {
  const { userId } = await request.json();

  try {
    await prisma.habit.updateMany({
      where: { userId },
      data: { isThumbsUp: false, isThumbsDown: false },
    });

    const updatedHabits = await prisma.habit.findMany({
      where: { userId },
    });

    return new Response(JSON.stringify(updatedHabits), {
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
