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

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crear(createUsuarioDto);
  }

  @Get()
  buscarTodos() {
    return this.usuariosService.buscarTodos();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(+id);
  }

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
