import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

class MembersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.number(),
      teamId: z.number(),
    });

    const { userId, teamId } = bodySchema.parse(request.body);

    // Verificando se o usuário já faz parte do time
    const userInTeam = await prisma.teamMembers.findFirst({
      where: { userId, teamId },
    });
    if (userInTeam) {
      throw new AppError('User already in teams');
    }

    // Inserindo o usuário ao time
    const memberTeam = await prisma.teamMembers.create({
      data: {
        userId,
        teamId,
      },
    });

    return response.status(201).json();
  }
}

export { MembersController };
