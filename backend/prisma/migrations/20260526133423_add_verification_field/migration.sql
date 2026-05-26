-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerificationExp" TIMESTAMP(3),
ADD COLUMN     "emailVerificationToken" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;
