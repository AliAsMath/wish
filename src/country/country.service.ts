import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.schema';

@Injectable()
export class CountryService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async create(name: string) {
    const country = await this.countryModel.findOne({ name });
    if (country) throw new NotAcceptableException('Country already exist');

    const newCountry = new this.countryModel({ name });
    return newCountry.save();
  }

  findAll() {
    return this.countryModel.find();
  }

  delete(id: string) {
    return this.countryModel.findByIdAndDelete(id);
  }
}
