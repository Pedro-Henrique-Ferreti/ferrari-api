import { Body, Controller, Get, Post } from '@nestjs/common';
import { TimeOptionService } from './time-option.service';

@Controller('time-options')
export class TimeOptionController {

  constructor(private timeOptionService: TimeOptionService) {}

  @Get()
  async get() {

    return this.timeOptionService.listTimeOptions();

  }

  @Post()
  async create(
    @Body('day') day: number,
    @Body('time') time: string,
  ) {

    return this.timeOptionService.createTimeOption({ day, time });

  }

}
