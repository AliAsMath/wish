import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  createUser(@Body() userData: CreateCountryDto) {
    return this.userService.create(userData);
  }

  @Get()
  getAllUsers() {
    return this.userService.findAll();
  }
}
