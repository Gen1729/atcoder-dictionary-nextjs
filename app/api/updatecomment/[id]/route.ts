import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // awaitを追加
  const Id = parseInt(id, 10); // stringをnumberに変換
  const { comment } = await request.json();

  const updatedComment = await prisma.problem.update({
    where: { id: Id }, // 更新対象の条件
    data: { comment: comment } // 更新する値
  });

  return NextResponse.json(updatedComment);
}
