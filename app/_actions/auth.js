"use server";
import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

export async function signupUser(_errState, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    return {
      message: "Passwords do not match. Please re-enter your passwords.",
    };
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    await prisma.user.create({
      data: {
        email: formData.get("email"),
        username: formData.get("username"),
        hash,
      },
    });
    redirect(`/class-option`);
  } catch (err) {
    if (err.message.includes("email")) {
      return { message: "Email is in use. Did you mean to Login?" };
    } else if (err.message.includes("username")) {
      return { message: "Username is in use. Please enter a new username." };
    }
    console.log(err);
    return { message: "Error occured during signup. Please try again." };
  }

  // revalidate cache
}
