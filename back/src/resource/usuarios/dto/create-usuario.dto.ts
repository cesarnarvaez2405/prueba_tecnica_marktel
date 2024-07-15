import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Usuario } from '../entities/usuario.entity';

interface ICrearUsuarioDto
  extends Pick<
    Usuario,
    'email' | 'username' | 'password' | 'nombre' | 'estaActivo' | 'rol'
  > {}

export class CreateUsuarioDto implements ICrearUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El username es obligatorio' })
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'El Email es obligatorio' })
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'El password como minimo 8 caracteres' })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly nombre: string;

  @IsString()
  @IsIn(['admin', 'user'], {
    message: 'Solamente se permite el rol de admin o user',
  })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  readonly rol: string;

  @IsBoolean({ message: 'El campo esta_activo debe ser booleano' })
  @IsOptional()
  readonly estaActivo?: boolean;
}
