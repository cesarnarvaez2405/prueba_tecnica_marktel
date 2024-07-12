import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Usuario } from 'src/resource/usuarios/entities/usuario.entity';

interface ICrearUsuarioDto
  extends Pick<
    Usuario,
    'email' | 'username' | 'password' | 'nombre' | 'estaActivo' | 'rol'
  > {}

export class RegisterDto implements ICrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'El Email es obligatorio' })
  readonly email: string;

  @IsString()
  @MaxLength(8, { message: 'El password solo puede tener hasta 8 caracteres' })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly nombre: string;

  @IsString()
  @IsIn(['admin', 'user', 'support'], {
    message: 'Role must be either admin, user, or support',
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  readonly rol: string;

  @IsBoolean({ message: 'El campo esta_activo debe ser booleano' })
  @IsOptional()
  readonly estaActivo?: boolean;
}
