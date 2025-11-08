import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { Cancha } from '../cancha/cancha.entity';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Tamanio extends BaseEntity {
  @Property({ nullable: false, unique: true })
  capacidad_x_equipo!: number;
  @Property({ nullable: false })
  ancho!: number;
  @Property({ nullable: false })
  largo!: number;
  @OneToMany(() => Cancha, (cancha) => cancha.tamanio, {
    cascade: [Cascade.ALL],
  })
  canchas = new Collection<Cancha>(this);
}
