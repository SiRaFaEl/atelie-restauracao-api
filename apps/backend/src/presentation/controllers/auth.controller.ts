import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { RegisterAuthDto } from '../../presentation/dtos/register-auth.dto';
import { LoginAuthDto } from '../../presentation/dtos/login-auth.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';
import { AdminGuard } from '../../infrastructure/auth/admin.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterAuthDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Get('users')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async listUsers() {
    return this.authService.findAllUsers();
  }

  @Patch('users/:id/activate')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async toggleUserActive(@Param('id') userId: string) {
    return this.authService.toggleUserActive(userId);
  }
}
