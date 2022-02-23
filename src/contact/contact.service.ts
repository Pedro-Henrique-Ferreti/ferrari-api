import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {

  constructor(private prisma: PrismaService) {}

  async list() {

    return await this.prisma.contact.findMany();

  }

  async get (id: number) {

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is invalid');
    }

    return this.prisma.contact.findUnique({
      where: { id },
    });

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

  async delete(id: number) {

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is invalid');
    }

    const contact = await this.get(id);

    if (!contact) {
      throw new BadRequestException('Id not found');
    }

    return this.prisma.contact.delete({
      where: { id },
    });

  }

}
