import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { email, username, password, confirmPassword } = await request.json();

  if (password !== confirmPassword) {
    return Response.json({
      error: "Passwords do not match. Please re-enter your passwords.",
    });
  }

  const salt = bcrypt.genSaltSync();
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        hash,
        userClass: null,
        userCharacter: null,
      },
    });
    delete user.hash;
    return Response.json(user);
  } catch (err) {
    console.log(err.message);
    if (err.message.includes("email")) {
      return Response.json({
        error: "Email is in use. Did you mean to Login?",
      });
    } else if (err.message.includes("username")) {
      return Response.json({
        error: "Username is in use. Please enter a new username.",
      });
    }
    return Response.json({
      error: "Error occured during signup. Please try again.",
    });
  }
}
