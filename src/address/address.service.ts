import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {

  constructor(private prisma: PrismaService) {}

  async create(personId: number, data: CreateAddressDto) {
    personId = Number(personId);

    if (isNaN(personId)) {
      throw new BadRequestException('PersonId is invalid');
    }

    return this.prisma.address.create({
      data: {
        personId,
        ...data,
      },
    });
  }
}
