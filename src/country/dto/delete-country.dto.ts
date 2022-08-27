import { IsNotEmpty, IsString } from 'class-validator';

export class deleteCountryDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
