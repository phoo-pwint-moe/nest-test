import { Controller, Post, Body, UseGuards, Request, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (existingUser) return { message: 'Username already exists' };

    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return {
      userId: req.user.userId,
        username: req.user.username,
      };
    }
  }
