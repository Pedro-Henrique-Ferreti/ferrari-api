import { BadRequestException } from "@nestjs/common";

export const isValidNumber = (number: number, message: string = 'Id is invalid') => {
  number = Number(number);

  if (isNaN(number)) {
    throw new BadRequestException(message);
  }

  return number;
}