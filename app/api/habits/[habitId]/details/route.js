import prisma from "@/app/lib/prisma";

export async function PUT(request, { params }) {
  const { habitId } = params;
  const { habit, habitType, time } = await request.json();

  try {
    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        habit,
        habitType,
        time,
      },
    });
    return new Response(JSON.stringify(updatedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update habit details" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
