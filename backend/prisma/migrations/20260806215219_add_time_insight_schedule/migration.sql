/*
  Warnings:

  - You are about to drop the column `DateTime` on the `AiInsightSchedule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiInsightSchedule" DROP COLUMN "DateTime",
ADD COLUMN     "time" TEXT;
