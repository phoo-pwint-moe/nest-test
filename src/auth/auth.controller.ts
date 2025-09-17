import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const token = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );
    if (!token) return { message: 'Invalid credentials' };
    return token;
  }
}
