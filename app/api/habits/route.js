import { getHabitsByUserId, createHabit } from "@/services/habitService";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  try {
    //calls on the getHabitsByUserId we made in habitService.js
    const habits = await getHabitsByUserId(userId);
    return Response.json(habits);
  } catch (error) {
    console.error("Failed to fetch habits:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch habits" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const habitData = await request.json();

  try {
    //calls on the createHabit we made in habitService.js
    const newHabit = await createHabit(habitData);
    return Response.json(newHabit, { status: 201 });
  } catch (error) {
    console.error("Failed to create new habit:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create new habit" }),
      { status: 500 }
    );
  }
}
