// /app/api/leaderboard/route.js
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const leaderboard = await prisma.user.findMany({
      orderBy: {
        overallEXP: "desc",
      },
      take: 10,
      select: {
        username: true,
        overallEXP: true,
        overallLevel: true,
        userCharacter: true,
      },
    });
    return new Response(JSON.stringify(leaderboard), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return new Response(
      JSON.stringify({ error: "Unable to fetch leaderboard" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
