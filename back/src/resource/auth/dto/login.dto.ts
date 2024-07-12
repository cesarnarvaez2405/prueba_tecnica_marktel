import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'El email debe ser obligatorio' })
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
