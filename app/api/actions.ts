import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getProblems(minDiff: number, maxDiff: number, levels: string[], tags: string[]) {
  const problems = await prisma.problem.findMany({
    where: {
      difficulty: {
        gte: minDiff,
        lte: maxDiff,
      },
      level: {
        in: levels,
      },
      // tags: DB上はカンマ区切り文字列なので、OR条件で部分一致
      OR: tags.map(tag => ({
        tags: {
          contains: tag,
        },
      })),
    },
  });
  return Response.json(problems);
}