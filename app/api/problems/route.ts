// app/api/problems/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const minDiff = Number(url.searchParams.get('minDiff')) || 0;
  const maxDiff = Number(url.searchParams.get('maxDiff')) || 3600;
  const minContestId = Number(url.searchParams.get('minContestId')) || 300;
  const maxContestId = Number(url.searchParams.get('maxContestId')) || 417;
  const levels = url.searchParams.getAll('levels');
  const tags = url.searchParams.getAll('tags');

  if(tags.length == 0){
    const problems = await prisma.Problem.findMany({
      where: {
        contestId: { gte: minContestId, lte: maxContestId },
        difficulty: { gte: minDiff, lte: maxDiff },
        level: { in: levels.length > 0 ? levels : undefined },
      },
    });

    return NextResponse.json(problems);
  }else{
    const problems = await prisma.Problem.findMany({
      where: {
        contestId: { gte: minContestId, lte: maxContestId },
        difficulty: { gte: minDiff, lte: maxDiff },
        level: { in: levels.length > 0 ? levels : undefined },
        OR: tags.length > 0 ? tags.map(tag => ({ tags: { contains: tag } })) : undefined,
      },
    });

    return NextResponse.json(problems);
  }

  
}
