/*
  Warnings:

  - The primary key for the `Hackathon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserHackathons` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[teamCode]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `Hackathon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `teamCode` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `A` on the `_UserHackathons` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/

-- Drop foreign key constraints
ALTER TABLE "HackathonTimeline"
DROP CONSTRAINT "HackathonTimeline_hackathonId_fkey";

ALTER TABLE "_UserHackathons"
DROP CONSTRAINT "_UserHackathons_A_fkey";

-- Alter the Hackathon table
ALTER TABLE "Hackathon" DROP CONSTRAINT "Hackathon_pkey",
DROP COLUMN "id",
ADD COLUMN "id" UUID NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ADD CONSTRAINT "Hackathon_pkey" PRIMARY KEY ("id");

-- Alter the HackathonTimeline table to match the type of Hackathon.id
ALTER TABLE "HackathonTimeline"
ALTER COLUMN "hackathonId" TYPE UUID USING "hackathonId"::uuid;

-- Alter the Project table
ALTER TABLE "Project" ADD COLUMN "hackathonId" UUID;

-- Alter the Team table
ALTER TABLE "Team" ADD COLUMN "teamCode" TEXT NOT NULL;

-- Alter the _UserHackathons table
ALTER TABLE "_UserHackathons" DROP CONSTRAINT "_UserHackathons_AB_pkey",
DROP COLUMN "A",
ADD COLUMN "A" UUID NOT NULL,
ADD CONSTRAINT "_UserHackathons_AB_pkey" PRIMARY KEY ("A", "B");

-- Create unique index for Team.teamCode
CREATE UNIQUE INDEX "Team_teamCode_key" ON "Team"("teamCode");

-- Recreate foreign key constraints
ALTER TABLE "_UserHackathons"
ADD CONSTRAINT "_UserHackathons_A_fkey" FOREIGN KEY ("A") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "HackathonTimeline"
ADD CONSTRAINT "HackathonTimeline_hackathonId_fkey"
FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE CASCADE;