import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validate-number';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {

  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.schedule.findUnique({
      where: {
        id: isValidNumber(id),
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

    scheduleAt = new Date(scheduleAt);

    const schedule = await this.prisma.schedule.create({
      data: {
        timeOptionId: isValidNumber(timeOptionId),
        paymentSituationId: isValidNumber(paymentSituationId),
        billingAddressId: isValidNumber(billingAddressId),
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

}
