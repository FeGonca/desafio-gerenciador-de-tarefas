import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

class TeamsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      description: z.string().trim(),
    });

    const { name, description } = bodySchema.parse(request.body);

    // Inserindo Teams no banco de dados
    const teams = await prisma.teams.create({
      data: {
        name,
        description,
      },
    });

    return response.status(201).json();
  }
}

export { TeamsController}