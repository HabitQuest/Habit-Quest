import { prisma } from "@/lib/prisma";

export async function getUserById(userId) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

export async function getAllUsers() {
  return prisma.user.findMany();
}

export async function createUser(data) {
  return prisma.user.create({ data });
}

//play around with this one depending on how you want it to work
export async function updateUser(id, data) {
  return prisma.user.update({
    where: { id },
    data,
  });
}
