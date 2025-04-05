/*
  Warnings:

  - You are about to drop the column `themes` on the `Hackathon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hackathon" DROP COLUMN "themes",
ADD COLUMN     "domains" TEXT[];
