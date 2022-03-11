import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Token } from './dto/token';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({
    description: 'Create a user and returns a token',
    type: Token,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
