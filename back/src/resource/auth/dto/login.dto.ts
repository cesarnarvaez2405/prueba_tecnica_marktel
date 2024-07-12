import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El usarname debe ser obligatorio' })
  username: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'El password es obligatorio' })
  password: string;
}
