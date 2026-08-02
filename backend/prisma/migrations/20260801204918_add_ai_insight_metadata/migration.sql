/*
  Warnings:

  - Added the required column `dateRange` to the `AiInsight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AiInsight" DROP COLUMN "dateRange",
ADD COLUMN     "dateRange" TIMESTAMP(3) NOT NULL;
