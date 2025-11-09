import {
  Entity,
  Property,
  ManyToOne,
  ManyToMany,
  OneToMany,
  Collection,
  Cascade,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Tamanio } from '../tamanio/tamanio.entity.js';
import { Tipo } from '../tipo/tipo.entity.js';
import { Turno } from '../turno/turno.entity.js';
import { Reserva } from '../reserva/reserva.entity.js';

@Entity()
export class Cancha extends BaseEntity {
  @Property({ nullable: false, unique: true })
  numero!: number;
  @Property({ nullable: false })
  nombre!: string;
  @Property({ nullable: false })
  tipo_turno!: 'en_punto' | 'y_media';

  @ManyToOne(() => Tamanio, { nullable: true })
  tamanio!: Rel<Tamanio>;

  @ManyToOne(() => Tipo, { nullable: true })
  tipo!: Tipo;

  @ManyToMany(() => Turno, (turno) => turno.canchas, {
    cascade: [Cascade.ALL],
    owner: true,
  })
  turnos!: Turno[];

  @OneToMany(() => Reserva, (reserva) => reserva.cancha, {
    cascade: [Cascade.ALL],
  })
  reservas = new Collection<Reserva>(this);
}
