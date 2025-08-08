import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.getAll('tags');

  if (tags.length === 0) {
    return NextResponse.json([]);
  }

  // 指定されたタグが含まれている問題を検索
  const problems = await prisma.problem.findMany({
    where: {
      OR: tags.map(tag => ({
        tags: {
          contains: tag
        }
      }))
    }
  });

  return NextResponse.json(problems);
}
