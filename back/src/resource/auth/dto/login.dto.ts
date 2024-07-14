import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El usarname debe ser obligatorio' })
  username: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @MinLength(8, { message: 'El password como minimo 8 caracteres' })
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
