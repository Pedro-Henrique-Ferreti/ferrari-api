import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreatePaymentSituationDto } from './dto/create-payment-situation.dto';
import { UpdatePaymentSituationDto } from './dto/update-payment-situation.dto';
import { PaymentSituationService } from './payment-situation.service';

@Controller('payment-situations')
export class PaymentSituationController {

  constructor(private paymentSituationService: PaymentSituationService) {}

  @Get()
  async listAll () {
    return this.paymentSituationService.findAll();
  }

  @Get(':id')
  async show (@Param('id', ParseIntPipe) id) {
    return this.paymentSituationService.findById(id);
  }

  @Post()
  async create(@Body() data: CreatePaymentSituationDto) {
    return this.paymentSituationService.create(data);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() data: UpdatePaymentSituationDto) {
    return this.paymentSituationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.paymentSituationService.delete(id);
  }
}
