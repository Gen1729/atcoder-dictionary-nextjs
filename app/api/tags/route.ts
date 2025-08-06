// app/api/problems/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const tags = await prisma.tag.findMany();

  return NextResponse.json(tags);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'タグ名が不正です' }, { status: 400 });
  }
  const newTag = await prisma.tag.create({
    data: {
      name: name,
    },
  });
  return NextResponse.json(newTag);
}
