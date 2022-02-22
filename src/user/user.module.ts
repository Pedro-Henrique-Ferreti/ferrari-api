import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MailModule } from 'src/mail/mail.module';
import { PasswordService } from './password.service';

@Module({
  imports: [
    MailModule,
    PrismaModule
  ],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
