import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { AdminGuard } from '../../infrastructure/auth/admin.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async listUsers() {
    return this.authService.findAllUsers();
  }

  @Patch(':id/activate')
  async toggleUserActive(@Param('id') userId: string) {
    return this.authService.toggleUserActive(userId);
  }
}
