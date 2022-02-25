import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validate-number';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {

  constructor(private prisma: PrismaService) {}

  async isValidPerson(id: number, personId: number) {
    personId = isValidNumber(personId);

    const address = await this.findOne(isValidNumber(id));

    if (address.personId !== personId) {
      throw new BadRequestException('Operation is invalid');
    }

    return true;
  }

  async findOne(id: number) {
    return this.prisma.schedule.findUnique({
      where: {
        id: isValidNumber(id),
      },
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany();
  }

  async findByPerson(personId: number) {
    return this.prisma.schedule.findMany({
      where: {
        personId: isValidNumber(personId),
      },
    });
  }

  async create(personId: number, {
    timeOptionId,
    paymentSituationId,
    billingAddressId,
    scheduleAt,
    total,
    installments,
    services,
  }: CreateScheduleDto) {

    timeOptionId = isValidNumber(timeOptionId);
    billingAddressId = isValidNumber(billingAddressId);
    scheduleAt = new Date(scheduleAt);

    const timeOption = await this.prisma.timeOption.findUnique({
      where: { id: timeOptionId },
    });

    if (!timeOption) {
      throw new BadRequestException('Time option not found');
    }

    const address = this.prisma.address.findUnique({
      where: { id: billingAddressId },
    });

    if (!address) {
      throw new BadRequestException('Address not found');
    }

    const currentScheduleAt = this.prisma.schedule.findMany({
      where: { scheduleAt },
    });

    if (currentScheduleAt) {
      throw new BadRequestException('Time option already choosen');
    }

    const schedule = await this.prisma.schedule.create({
      data: {
        timeOptionId,
        paymentSituationId: isValidNumber(paymentSituationId),
        billingAddressId,
        scheduleAt,
        total: isValidNumber(total),
        installments: isValidNumber(installments),
        personId: isValidNumber(personId),
      },
    });

    if (schedule) {
      services.split(',').forEach(async (serviceId) => {
        await this.prisma.scheduleService.create({
          data: {
            scheduleId: schedule.id,
            serviceId: +serviceId,
          }
        })
      });
    }

    return schedule;
  }

  async delete(id: number, personId: number) {
    await this.isValidPerson(id, personId);

    return this.prisma.schedule.delete({
      where: { id },
    });
  }

}
