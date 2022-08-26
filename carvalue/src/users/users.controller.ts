import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() input: CreateUserDto) {
    this.userService.create(input.email, input.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  find(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
