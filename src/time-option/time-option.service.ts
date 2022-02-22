import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TimeOptionService {

  constructor(private prisma: PrismaService) {}

  async listTimeOptions() {

    return await this.prisma.timeOption.findMany();

  }
  
}
