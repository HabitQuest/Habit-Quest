import prisma from "@/app/lib/prisma";

export async function DELETE(request, { params }) {
  const { habitId } = params;

  try {
    const deletedHabit = await prisma.habit.delete({
      where: {
        id: habitId,
      },
    });
    return new Response(JSON.stringify(deletedHabit), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete habit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
