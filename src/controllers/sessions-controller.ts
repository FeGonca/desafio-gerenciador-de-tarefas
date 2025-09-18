import { Request, Response } from 'express';
import { AppError } from '@/utils/AppError';
import { prisma } from '@/database/prisma';
import { authConfig } from '@/config/auth';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { z } from 'zod';

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    // aplicando o schema nos dados do corpo da requisição
    const { email, password } = bodySchema.parse(request.body);

    // verificando se o usuário existe
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // verificando se a senha está correta
    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Invalid email or password', 401);
    }

    // criando token para usuário
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({ role: user.role ?? 'user' }, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    const { name, role } = user;
    return response.json({ token, name, role });
  }
}

export { SessionsController };
