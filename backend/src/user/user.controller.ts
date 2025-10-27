import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import UpdateProfileDto from './dto/update-profile.dto';
import ChangePasswordDto from './dto/change-password.dto';
import JwtAuthGuard from '@/auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user.sub;
    return this.userService.getProfile(userId);
  }

  @Patch('profile')
  async updateProfile(
    @Request() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.sub;
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  @Patch('change-password')
  async changePassword(
    @Request() req: any,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = req.user.sub;
    return this.userService.changePasswordWithValidation(
      userId,
      changePasswordDto,
    );
  }
}
