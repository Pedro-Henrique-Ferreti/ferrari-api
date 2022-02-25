import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { isValidNumber } from 'utils/validate-number';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {

  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}

  async isValidPerson(id: number, personId: number) {
    personId = isValidNumber(personId);

    const address = await this.findOne(id);

    if (address.personId !== personId) {
      throw new BadRequestException('Operation is invalid');
    }

    return true;
  }

  async findAll() {
    return this.prisma.address.findMany();
  }

  async findOne(id: number) {
    return this.prisma.address.findUnique({
      where: {
        id: isValidNumber(id),
      },
    });
  }

  async findByPersonId(personId: number) {
    return this.prisma.address.findMany({
      where: {
        personId: isValidNumber(personId),
      }
    });
  }

  async create(personId: number, data: CreateAddressDto) {
    personId = isValidNumber(personId);

    return this.prisma.address.create({
      data: {
        personId,
        ...data,
      },
    });
  }

  async update(id: number, personId: number, data: UpdateAddressDto) {
    await this.isValidPerson(id, personId);
    
    return await this.prisma.address.update({
      where: {
        id: isValidNumber(id),
      },
      data,
    });
  }

  async delete(id: number, personId: number) {
    await this.isValidPerson(id, personId);
    
    return await this.prisma.address.delete({
      where: {
        id: isValidNumber(id),
      },
    });
  }

  async searchCep(cep: string) {
    cep = cep.replace(/[^\d]+g/, '');
    
    try {
      const response = await lastValueFrom(this.httpService.request({
        method: 'GET',
        url: `https://viacep.com.br/ws/${cep}/json/`,
      }));
  
      return response.data;
    }
    catch (error) {
      throw new BadRequestException('Failed to search for the CEP')
    }   
  }
}
