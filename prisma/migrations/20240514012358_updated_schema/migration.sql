/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Sessions` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "createdAt",
DROP COLUMN "token",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
