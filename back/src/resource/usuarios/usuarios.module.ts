import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DataBaseModule } from 'src/config/configOrm.module';
import { usuariosProviders } from './usuarios.providers';

@Module({
  imports: [DataBaseModule],
  controllers: [UsuariosController],
  providers: [...usuariosProviders, UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
