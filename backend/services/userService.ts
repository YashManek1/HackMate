// src/services/userService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true, bio: true, skills: true }, // Public fields
    });
    if (!user) throw new Error('User not found');
    return user;
  }

  async updateUser(id: string, updates: any) {
    const user = await prisma.user.update({
      where: { id },
      data: updates,
    });
    return user;
  }
}

export const userService = new UserService();