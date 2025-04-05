import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

interface CreateTeamInput {
  name: string;
  description?: string;
  leaderId: string;
  lookingForMembers?: boolean;
}

export const createTeam = async ({ name, description, leaderId, lookingForMembers }: CreateTeamInput) => {
  const teamCode = uuidv4(); // Generate a unique team code
  return await prisma.team.create({
    data: {
      name,
      description,
      leaderId,
      lookingForMembers,
      teamCode,
    },
  });
};

export const updateTeam = async (teamId: string, updates: Partial<CreateTeamInput>) => {
  return await prisma.team.update({
    where: { id: teamId },
    data: updates,
  });
};

export const getTeam = async (teamId: string) => {
  return await prisma.team.findUnique({
    where: { id: teamId },
    include: { members: true }, // Include members if needed
  });
};

export const deleteTeam = async (teamId: string) => {
  return await prisma.team.delete({
    where: { id: teamId },
  });
};

export const joinTeam = async (teamCode: string, userId: string) => {
  const team = await prisma.team.findUnique({
    where: { teamCode },
  });

  if (!team) {
    throw new Error('Invalid team code');
  }

  // Add user to the team
  await prisma.teamMember.create({
    data: {
      teamId: team.id,
      userId,
    },
  });

  return team;
};