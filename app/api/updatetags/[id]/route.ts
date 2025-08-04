// app/api/problems/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const url = new URL(request.url);
  const { id } = await params; // awaitを追加
  const Id = parseInt(id, 10); // stringをnumberに変換
  const tags = url.searchParams.getAll('tags');
  
  const tagsString = tags.join(',');

  const updatedTags = await prisma.problem.update({
    where: { id: Id }, // 更新対象の条件
    data: { tags: tagsString } // 更新する値
  });

  return NextResponse.json(updatedTags);
}
