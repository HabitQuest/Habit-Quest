import prisma from "@/app/lib/prisma";

export async function PUT(request, { params }) {
  const { habitId } = params;

  try {
    const requestData = await request.json();
    const { habit, habitType, time, duration } = requestData;

    console.log("Received update data:", requestData);

    const updatedHabit = await prisma.habit.update({
      where: { id: habitId },
      data: {
        habit,
        habitType,
        time,
        duration: duration !== undefined ? duration : null,
      },
    });

    return new Response(JSON.stringify(updatedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating habit details:", error);

    const status =
      error instanceof Prisma.PrismaClientKnownRequestError ? 400 : 500;
    const message =
      status === 400
        ? "Invalid request to update habit."
        : "Failed to update habit details";

    return new Response(
      JSON.stringify({ error: message, details: error.message }),
      {
        status: status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
