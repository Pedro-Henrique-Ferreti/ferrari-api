import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          port: Number(process.env.MAIL_PORT),
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        },
        defaults: {
          from: `Hcode Lab <${process.env.MAIL_FROM}>`
        },
        template: {
          dir: resolve(__dirname, 'templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          }
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
