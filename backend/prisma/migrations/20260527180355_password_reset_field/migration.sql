-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordResetExp" TIMESTAMP(3),
ADD COLUMN     "passwordResetToken" TEXT;
