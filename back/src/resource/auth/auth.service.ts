import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async registrar(registerDto: RegisterDto) {
    const { email } = registerDto;
    const tieneEmail = await this.usuarioService.buscarPorEmail(email);
    if (tieneEmail) {
      throw new BadRequestException('Este usuario ya existe');
    }
    registerDto.password = await bcrypt.hash(registerDto.password, 10);
    return await this.usuarioService.crear(registerDto);
  }

  async actualizarPassword(id: number, datosDto: UpdateAuthDto) {
    await this.usuarioService.buscarPorId(id);
    datosDto.password = await bcrypt.hash(datosDto.password, 10);
    return await this.usuarioService.actualizar(id, datosDto);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const usuario = await this.usuarioService.buscarPorUsername(username);
    if (!usuario) {
      throw new BadRequestException('El usuario no esta registrado');
    }
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      throw new UnauthorizedException('El password es incorrecto');
    }

    const horaAutenticacion = new Date().toISOString();
    const payload = {
      email: usuario.email,
      rol: usuario.rol,
      time: horaAutenticacion,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
      payload,
    };
  }

  async buscarPerfil(perfil: Partial<Usuario>) {
    const { email } = perfil;
    return await this.usuarioService.buscarPorEmail(email);
  }
}
