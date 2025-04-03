// src/middleware/roleMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const roleMiddleware = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.user!.id;
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!user || !roles.includes(user.role)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  next();
};