import prisma from "@/app/lib/prisma";

// Handle PUT request to update thumbs up/down status
export async function PUT(request, { params }) {
  const { habitId } = params;
  const { isThumbsUp, isThumbsDown } = await request.json();

  try {
    const updatedHabit = await prisma.habit.update({
      where: {
        id: habitId,
      },
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
