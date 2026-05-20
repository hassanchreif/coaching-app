import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMyClients(coachId: number) {
    return this.prisma.user.findMany({
      where: { coachId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
  }

  async assignClient(coachId: number, clientId: number) {
    return this.prisma.user.update({
      where: { id: clientId },
      data: {
        coachId,
      },
    });
  }
}