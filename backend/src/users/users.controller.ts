import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssignClientDto } from './dto/assign-client.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-clients')
  getMyClients(@Request() req: any) {
    return this.usersService.getMyClients(
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('assign-client')
  assignClient(
    @Request() req: any,
    @Body() data: AssignClientDto,
  ) {
    return this.usersService.assignClient(
      req.user.userId,
      data.clientId,
    );
  }
}