import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @MinLength(3)
  @Matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*$/)
  @IsNotEmpty()
  name: string;
}
