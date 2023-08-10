/*
  Warnings:

  - You are about to drop the column `AvatarUrl` on the `Author` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "AvatarUrl",
ADD COLUMN     "avatarUrl" TEXT;
