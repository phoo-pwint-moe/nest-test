import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) return { message: 'Username already exists' };

    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully', userId: user._id };
  }
}
