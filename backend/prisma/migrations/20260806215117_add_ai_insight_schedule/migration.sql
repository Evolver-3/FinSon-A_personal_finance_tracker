-- CreateTable
CREATE TABLE "AiInsightSchedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekly" BOOLEAN NOT NULL DEFAULT false,
    "monthly" BOOLEAN NOT NULL DEFAULT true,
    "dayOfWeek" INTEGER,
    "dayOfMonth" INTEGER,
    "DateTime" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiInsightSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiInsightSchedule_userId_key" ON "AiInsightSchedule"("userId");

-- AddForeignKey
ALTER TABLE "AiInsightSchedule" ADD CONSTRAINT "AiInsightSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
