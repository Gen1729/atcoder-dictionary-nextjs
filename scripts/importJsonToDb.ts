import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs/promises';

const prisma = new PrismaClient();

async function main() {
  // JSONファイルを読み込む
  const data = JSON.parse(await readFile('public/data.json', 'utf-8'));

  for (const item of data) {
    await prisma.problem.create({
      data: {
        title: item.title,
        url: item.url,
        tags: '',
        contestId: item.contestId,
        difficulty: item.difficulty,
        level: item.level,
        contestType: 'ABC',
        comment: '',
      },
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());