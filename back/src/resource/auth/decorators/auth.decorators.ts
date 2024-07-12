import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './roles.decorators';
import { AuthGuard } from '../guard/auth.guard';
import { RolesGuard } from '../guard/roles.guard';
import { Role } from 'src/common/enums/rol.enum';

export function Auth(rol?: Role) {
  return applyDecorators(Roles(rol), UseGuards(AuthGuard, RolesGuard));
}
