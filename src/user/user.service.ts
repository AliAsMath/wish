import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(userData: User) {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  findAll() {
    return this.userModel.find().populate('country');
  }
}
