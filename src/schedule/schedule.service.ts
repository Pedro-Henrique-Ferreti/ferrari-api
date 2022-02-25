import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidId } from 'utils/validate-id';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {

  constructor(private prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.schedule.findUnique({
      where: {
        id: isValidId(id),
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
        timeOptionId: isValidId(timeOptionId),
        paymentSituationId: isValidId(paymentSituationId),
        billingAddressId: isValidId(billingAddressId),
        scheduleAt,
        total: isValidId(total),
        installments: isValidId(installments),
        personId: isValidId(personId),
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
