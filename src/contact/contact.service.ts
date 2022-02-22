import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {

  constructor(private prisma: PrismaService) {}

  async list() {

    return await this.prisma.contact.findMany();

  }

  async create(
    { name, email, message }:
    { name: string, email: string; message: string }
  ) {

    if (!email) {
      throw new BadRequestException('Email is required');
    }
    if (!message) {
      throw new BadRequestException('Message is required');
    }

    let personId;

    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { personId: true },
    });

    if (user) {
      personId = Number(user.personId);
    } else {

      const contact = await this.prisma.contact.findFirst({
        where: {
          email,
        },
      });

      if (contact) {
        personId = Number(contact.personId);
      } else {
        
        const newPerson = await this.prisma.person.create({
          data: { name },
        });

        personId = Number(newPerson.id);
      }
    }
    
    return this.prisma.contact.create({
      data: {
        personId,
        email,
        message,
      },
    });

  }

}
