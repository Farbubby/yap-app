/*
  Warnings:

  - Added the required column `dislikes` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "dislikes" INTEGER NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;
