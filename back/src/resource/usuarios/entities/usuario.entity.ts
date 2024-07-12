import { entityBase } from 'src/utils/entityBase';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario extends entityBase {
  @Column({ unique: true })
  username: string;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  rol: string;

  @Column({ name: 'esta_activo', default: true })
  estaActivo?: boolean;
}
