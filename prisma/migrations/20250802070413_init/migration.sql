-- CreateTable
CREATE TABLE "public"."Problem" (
    "id" SERIAL NOT NULL,
    "contestType" TEXT NOT NULL,
    "contestId" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "tags" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
