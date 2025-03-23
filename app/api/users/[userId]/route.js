import prisma from "@/app/lib/prisma";
import { getAllUsers, createUser, getUserById } from "@/services/userService";

//controller for getUserById
export async function GET(request, { params }) {
  const { userId } = params;

  try {
    //this initiates the prisma query that finds the User based on userId. The "getUserById(userId)" method is in services/userService
    const user = await getUserById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return Response.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

//controller for getAllUsers
export async function GET() {
  try {
    //this initiates the prisma query that get All users
    const users = await getAllUsers();
    return Response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

//controller for updateUser
export async function GET(request, { params }) {
  const { userId } = params;

  try {
    //this initiates the prisma query that finds the User based on userId. The "getUserById(userId)" method is in services/userService
    const user = await getUserById(userId);
    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    return Response.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal server error", { status: 500 });
  }
}

//controller for updating a User
export async function PUT(request, { params }) {
  const { userId } = params;
  const body = await request.json();

  try {
    const updatedUser = await updateUser(userId, body);
    return Response.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Failed to update user", { status: 500 });
  }
}
