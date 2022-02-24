import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/user/user.decorator';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressController {

  constructor(private addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() data: CreateAddressDto, @User() user) {
    return await this.addressService.create(user.personId, data);
  }

}
