import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string().trim(),
      description: z.string().trim(),
      assignedTo: z.number(),
      teamId: z.number(),
    });

    const { title, description, assignedTo, teamId } = bodySchema.parse(
      request.body
    );

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        assignedTo,
        teamId,
      },
    });

    return response.status(201).json();
  }
}

export { TasksController };
