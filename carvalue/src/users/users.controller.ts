import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() input: CreateUserDto) {
    this.userService.create(input.email, input.password);
  }

  @Get('/user')
  findOne(id: number) {
    return this.userService.findOne(id);
  }

  @Get('/users')
  find(@Body() input: CreateUserDto) {
    return this.userService.find(input.email);
  }
}
