import { PrismaClient } from "@prisma/client";
import { HackathonInput } from "../types/hackathonTypes";

const prisma = new PrismaClient();

export async function storeHackathonData(data: HackathonInput) {
  try {
    // Create the Hackathon without the timeline
    const hackathon = await prisma.hackathon.create({
      data: {
        team: {
          connect: {
            id: data.teamId, // Assumes team already exists
          },
        },
        name: data.name,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        rules: data.rules,
        prizeDetails: data.prizeDetails ?? {},
        themes: data.themes,
      },
    });

    // Create the timeline entries separately
    if (data.timeline && data.timeline.length > 0) {
      await prisma.hackathonTimeline.createMany({
        data: data.timeline.map((event) => ({
          hackathonId: hackathon.id, // Link to the created Hackathon
          eventName: event.eventName,
          eventTime: new Date(event.eventTime),
          description: event.description,
        })),
      });
    }

    // Return the created Hackathon with its timeline
    const hackathonWithTimeline = await prisma.hackathon.findUnique({
      where: { id: hackathon.id },
      include: { timeline: true },
    });

    return hackathonWithTimeline;
  } catch (error: any) {
    console.error("❌ Error storing hackathon data:", error);
    throw new Error("Hackathon creation failed.");
  }
}
