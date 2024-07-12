import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from './decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';
import { UsuarioActivo } from 'src/common/decorators/usuarioActivo.decorators';
import { UsuarioActivoInterface } from 'src/common/interface/usuarioActivo.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('registro')
  registro(@Body() registerDto: RegisterDto) {
    try {
      return this.authService.registrar(registerDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('perfil')
  @Auth(Role.Admin)
  perfil(@UsuarioActivo() usuario: UsuarioActivoInterface) {
    try {
      return this.authService.buscarPerfil(usuario);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
