/*
  Warnings:

  - You are about to drop the column `location` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the column `visitedAt` on the `Memory` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Memory" DROP COLUMN "location",
DROP COLUMN "visitedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
