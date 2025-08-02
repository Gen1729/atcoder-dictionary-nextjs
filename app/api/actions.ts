import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProblems() {
  const tasks = await prisma.problem.findMany();
  return Response.json(tasks);
}