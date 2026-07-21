/*
  Warnings:

  - You are about to drop the column `emailVerificationExp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerificationToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetExp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerificationExp",
DROP COLUMN "emailVerificationToken",
DROP COLUMN "emailVerified",
DROP COLUMN "password",
DROP COLUMN "passwordResetExp",
DROP COLUMN "passwordResetToken",
DROP COLUMN "role",
ADD COLUMN     "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
