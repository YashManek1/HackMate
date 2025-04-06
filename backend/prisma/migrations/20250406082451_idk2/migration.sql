-- DropForeignKey
ALTER TABLE "HackathonTimeline" DROP CONSTRAINT "HackathonTimeline_hackathonId_fkey";

-- AlterTable
ALTER TABLE "HackathonTimeline" ALTER COLUMN "hackathonId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "HackathonTimeline" ADD CONSTRAINT "HackathonTimeline_hackathonId_fkey" FOREIGN KEY ("hackathonId") REFERENCES "Hackathon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
