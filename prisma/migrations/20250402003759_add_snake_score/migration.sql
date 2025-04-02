-- CreateTable
CREATE TABLE "SnakeScore" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "playedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SnakeScore_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SnakeScore" ADD CONSTRAINT "SnakeScore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
