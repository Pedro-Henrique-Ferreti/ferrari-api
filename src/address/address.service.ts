import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {

  constructor(private prisma: PrismaService) {}

  dataIsValid(data: CreateAddressDto) {
    data.personId = Number(data.personId);

    if (isNaN(data.personId)) {
      throw new BadRequestException('PersonId is invalid');
    }
    if (!data.street) {
      throw new BadRequestException('Street is required');
    }
    if (!data.district) {
      throw new BadRequestException('District is required');
    }
    if (!data.city) {
      throw new BadRequestException('City is required');
    }
    if (!data.state) {
      throw new BadRequestException('State is required');
    }
    if (!data.country) {
      throw new BadRequestException('Country is required');
    }
    if (!data.zipcode) {
      throw new BadRequestException('Zipcode is required');
    }

    return data as CreateAddressDto;
  }

  async create(data: CreateAddressDto) {
    return this.prisma.address.create({
      data: this.dataIsValid(data),
    });
  }
}
