import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {

  constructor(private scheduleService: ScheduleService) {}
  
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.scheduleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('my-schedules')
  async findByPerson(@User() user) {
    return this.scheduleService.findByPerson(user.personId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() data: CreateScheduleDto,
    @User() user,
  ) {
    return this.scheduleService.create(user.personId, data);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id, @User() user) {
    return this.scheduleService.delete(id, user.personId);
  }
}
