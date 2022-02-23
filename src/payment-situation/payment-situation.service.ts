import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentSituationService {

  constructor(private prisma: PrismaService) {}

  isValidId(id) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('Id is invalid');
    }

    return id;
  }

  async findById(id: number) {
    return this.prisma.paymentSituation.findUnique({
      where: {
        id: this.isValidId(id),
      },
    });
  }
  
  async create({ name } : { name: string; }) {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    return this.prisma.paymentSituation.create({
      data: { name },
    });
  }

  async update(id: number, name: string) {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    if (!await this.findById(id)) {
      throw new BadRequestException('Id not found');
    }

    return this.prisma.paymentSituation.update({
      where: {
        id: this.isValidId(id),
      },
      data: { name },
    });
  }

  async delete(id: number) {
    if (!await this.findById(id)) {
      throw new BadRequestException('Id not found');
    }
    
    return this.prisma.paymentSituation.delete({
      where: {
        id: this.isValidId(id),
      },
    });
  }

}
