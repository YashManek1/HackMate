/*
  Warnings:

  - You are about to drop the column `hackathonId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `hackathonId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `hackathonId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_HackathonJudges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_HackathonMentors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamId]` on the table `Hackathon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_hackathonId_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonJudges" DROP CONSTRAINT "_HackathonJudges_A_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonJudges" DROP CONSTRAINT "_HackathonJudges_B_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonMentors" DROP CONSTRAINT "_HackathonMentors_A_fkey";

-- DropForeignKey
ALTER TABLE "_HackathonMentors" DROP CONSTRAINT "_HackathonMentors_B_fkey";

-- AlterTable
ALTER TABLE "Hackathon" ADD COLUMN     "teamId" TEXT;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "hackathonId";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "hackathonId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hackathonId",
DROP COLUMN "role";

-- DropTable
DROP TABLE "_HackathonJudges";

-- DropTable
DROP TABLE "_HackathonMentors";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "HackathonTimeline" (
    "id" TEXT NOT NULL,
    "hackathonId" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HackathonTimeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserHackathons" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserHackathons_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserHackathons_B_index" ON "_UserHackathons"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Hackathon_teamId_key" ON "Hackathon"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_teamId_key" ON "Project"("teamId");

-- AddForeignKey
ALTER TABLE "Hackathon" ADD CONSTRAINT "Hackathon_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HackathonTimeline" ADD CONSTRAINT "HackathonTimeline_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHackathons" ADD CONSTRAINT "_UserHackathons_A_fkey" FOREIGN KEY ("A") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHackathons" ADD CONSTRAINT "_UserHackathons_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
