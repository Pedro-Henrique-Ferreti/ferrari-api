import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
