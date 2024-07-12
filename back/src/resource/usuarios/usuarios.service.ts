import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @Inject('USUARIO_REPOSITORY')
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async crear(createUsuarioDto: CreateUsuarioDto) {
    const usuario = this.usuarioRepository.create(createUsuarioDto);
    return await this.usuarioRepository.save(usuario);
  }

  async buscarTodos() {
    return await this.usuarioRepository.find();
  }

  async buscarPorId(id: number) {
    const usuarioCreado = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuarioCreado) {
      throw new NotFoundException('No se encontro el usuario con el id');
    }

    return usuarioCreado;
  }

  async buscarPorEmail(email: string) {
    const usuarioCreado = await this.usuarioRepository.findOne({
      where: { email },
    });
    return usuarioCreado ? usuarioCreado : null;
  }

  async actualizar(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioCreado = await this.buscarPorId(id);
    this.usuarioRepository.merge(usuarioCreado, updateUsuarioDto);
    return await this.usuarioRepository.save(usuarioCreado);
  }

  async borrar(id: number) {
    await this.buscarPorId(id);
    return await this.usuarioRepository.delete(id);
  }
}
