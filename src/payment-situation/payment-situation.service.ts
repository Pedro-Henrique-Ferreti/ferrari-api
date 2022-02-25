import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validate-number';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';

@Injectable()
export class PaymentSituationService {

  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.paymentSituation.findMany();
  }

  async findById(id: number) {
    return this.prisma.paymentSituation.findUnique({
      where: {
        id: isValidNumber(id),
      },
    });
  }
  
  async create(data: CreatePaymentSituationDto) {
    return this.prisma.paymentSituation.create({
      data,
    });
  }

  async update(id: number, data: UpdatePaymentSituationDto) {
    if (!await this.findById(id)) {
      throw new BadRequestException('Id not found');
    }

    return this.prisma.paymentSituation.update({
      where: {
        id: isValidNumber(id),
      },
      data,
    });
  }

  async delete(id: number) {
    if (!await this.findById(id)) {
      throw new BadRequestException('Id not found');
    }
    
    return this.prisma.paymentSituation.delete({
      where: {
        id: isValidNumber(id),
      },
    });
  }

}
