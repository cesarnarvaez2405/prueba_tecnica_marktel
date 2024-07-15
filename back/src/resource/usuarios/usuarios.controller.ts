import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Auth } from '../auth/decorators/auth.decorators';
import { Role } from 'src/common/enums/rol.enum';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crear(createUsuarioDto);
  }

  @Auth(Role.Admin)
  @Get()
  buscarTodos() {
    return this.usuariosService.buscarTodos();
  }

  @Auth(Role.Admin)
  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(+id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  actualizar(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.actualizar(+id, updateUsuarioDto);
  }

  @Delete(':id')
  borrar(@Param('id') id: string) {
    return this.usuariosService.borrar(+id);
  }
}
