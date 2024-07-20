import prisma from "@/app/lib/prisma";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
    });
    return new Response(JSON.stringify(habits), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch habits" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request) {
  const { habit, habitType, userId } = await request.json();

  try {
    const newHabit = await prisma.habit.create({
      data: {
        habit,
        habitType,
        userId,
      },
    });
    return new Response(JSON.stringify(newHabit), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to create new habit" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
