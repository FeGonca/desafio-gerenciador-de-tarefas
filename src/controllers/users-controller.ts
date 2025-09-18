import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

class UsersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    // verificando se o email já foi cadastrado
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });
    if (userWithSameEmail) {
      throw new AppError('User with same e-mail already exists');
    }
    const hashedPassword = await hash(password, 8);

    // Inserindo o usuário no banco de dados

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutSameEmail } = user;

    return response.json(userWithoutSameEmail);
  }
}

export { UsersController };
