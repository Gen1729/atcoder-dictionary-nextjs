-- CreateTable
CREATE TABLE "public"."Problem" (
    "id" SERIAL NOT NULL,
    "contesttype" TEXT NOT NULL,
    "contestnumber" INTEGER NOT NULL,
    "problem" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "Tags" TEXT NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);
