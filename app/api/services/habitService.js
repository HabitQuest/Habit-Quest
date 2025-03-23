import prisma from "@/app/lib/prisma";

// Get all habits for a specific user in prisma
export async function getHabitsByUserId(userId) {
  return await prisma.habit.findMany({
    where: { userId },
    orderBy: { time: "asc" },
  });
}

// Create a new habit in prisma
export async function createHabit({ habit, habitType, time, userId }) {
  return await prisma.habit.create({
    data: { habit, habitType, time, userId },
  });
}
