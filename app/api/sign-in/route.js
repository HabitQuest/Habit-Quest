import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json({
        error: "No account associated with this email address.",
      });
    }

    let passwordsMatch = await bcrypt.compare(password, user.hash);

    if (!passwordsMatch) {
      return Response.json({
        error: "Incorrect email or password. Please try again.",
      });
    }

    delete user.hash;

    return Response.json(user);
  } catch (err) {
    return Response.json({
      error: "An error occured during signin. Please try again.",
    });
  }
}
