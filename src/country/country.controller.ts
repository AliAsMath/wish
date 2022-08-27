import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { deleteCountryDto } from './dto/delete-country.dto';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Post()
  createCountry(@Body() countryData: CreateCountryDto) {
    return this.countryService.create(countryData.name);
  }

  @Get()
  getAllCountry() {
    return this.countryService.findAll();
  }

  @Delete(':id')
  deleteCountry(@Param('id') id: string) {
    return this.countryService.delete(id);
  }
}
