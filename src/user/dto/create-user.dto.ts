import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
  @MinLength(3)
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
  education: string;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsString()
  @IsNotEmpty()
  @IsNumberString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  position: string;
}
