-- CreateTable
CREATE TABLE "AiInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "period" TEXT NOT NULL DEFAULT 'month',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiInsight_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiInsight_userId_period_createdAt_idx" ON "AiInsight"("userId", "period", "createdAt");

-- AddForeignKey
ALTER TABLE "AiInsight" ADD CONSTRAINT "AiInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
