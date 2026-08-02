/*
  Warnings:

  - You are about to drop the column `dateRange` on the `AiInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AiInsight" DROP COLUMN "dateRange",
ADD COLUMN     "dateEnd" TEXT,
ADD COLUMN     "dateStart" TEXT;
