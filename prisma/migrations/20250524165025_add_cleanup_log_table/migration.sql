-- CreateTable
CREATE TABLE "CleanupLog" (
    "id" TEXT NOT NULL,
    "cleanupDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CleanupLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CleanupLog_cleanupDate_key" ON "CleanupLog"("cleanupDate");

-- CreateIndex
CREATE INDEX "CleanupLog_cleanupDate_idx" ON "CleanupLog"("cleanupDate");
