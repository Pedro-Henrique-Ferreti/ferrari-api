import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRE),
        },
      })
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AddressController],
  providers: [
    AddressService,
  ],
})
export class AddressModule {}
