export class CreateAddressDto {
  personId: number;
  street: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}
