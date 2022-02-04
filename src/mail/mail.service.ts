import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {

  constructor(private mailerService: MailerService) {}

  async send({
    to,
    subject,
    template,
    data,
  }:{
    to: string,
    subject: string,
    template: string,
    data: any
  }) {

    try {
      return this.mailerService.sendMail({
        to,
        subject,
        template,
        context: data,
      });
    }
    catch (error) {
      throw new BadRequestException(error.message);
    }

  }

}
