import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { DataBaseModule } from 'src/config/configOrm.module';
import { usuariosProviders } from './usuarios.providers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DataBaseModule, forwardRef(() => AuthModule)],
  controllers: [UsuariosController],
  providers: [...usuariosProviders, UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
