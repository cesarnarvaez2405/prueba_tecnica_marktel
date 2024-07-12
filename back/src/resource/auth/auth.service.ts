import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const usuario = await this.usuarioService.buscarPorEmail(email);
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

  async buscarPerfil(perfil: Usuario) {
    const { email } = perfil;
    return await this.usuarioService.buscarPorEmail(email);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
