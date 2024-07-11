import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
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
  @IsNotEmpty({ message: 'El Email es obligatorio' })
  readonly email: string;

  @IsString()
  @MaxLength(7, { message: 'El password solo puede tener hasta 8 caracteres' })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  readonly password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly rol?: string;

  @IsBoolean({ message: 'El campo esta_activo debe ser booleano' })
  @IsOptional()
  readonly estaActivo?: boolean;
}
