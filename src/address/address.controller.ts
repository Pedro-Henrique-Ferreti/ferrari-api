import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('addresses')
export class AddressController {

  constructor(private addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Get()
  async listAll() {
    return this.addressService.findAll();
  }
  
  @UseGuards(AuthGuard)
  @Get('my-addresses')
  async listByPerson(@User() user) {
    return this.addressService.findByPersonId(user.personId);
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id) {
    return this.addressService.findOne(+id);
  }
  
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateAddressDto, @User() user) {
    return await this.addressService.create(user.personId, data);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Body() data: UpdateAddressDto,
    @Param('id', ParseIntPipe) id: number,
    @User() user,
  ) {
    return this.addressService.update(id, user.personId, data);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id, @User() user) {
    return this.addressService.delete(id, user.personId);
  }

}
