import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentSituationService } from './payment-situation.service';

@Controller('payment-situations')
export class PaymentSituationController {

  constructor(private paymentSituationService: PaymentSituationService) {}

  @Get(':id')
  async show (@Param('id') id) {
    return this.paymentSituationService.findById(Number(id));
  }

  @Post()
  async create(@Body('name') name) {
    return this.paymentSituationService.create({ name });
  }

  @Put(':id')
  async update(@Param('id') id, @Body('name') name) {
    return this.paymentSituationService.update(Number(id), name);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return this.paymentSituationService.delete(Number(id));
  }
}
