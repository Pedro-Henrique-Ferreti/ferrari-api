import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { ContactModule } from './contact/contact.module';
import { TimeOptionModule } from './time-option/time-option.module';
import { ServiceModule } from './service/service.module';
import { PaymentSituationService } from './payment-situation/payment-situation.service';
import { PaymentSituationModule } from './payment-situation/payment-situation.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, MailModule, ContactModule, TimeOptionModule, ServiceModule, PaymentSituationModule, AddressModule],
  controllers: [AppController],
  providers: [PaymentSituationService],
})
export class AppModule {}
