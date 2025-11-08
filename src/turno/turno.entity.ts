import {
  Entity,
  Property,
  ManyToMany,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { Reserva } from '../reserva/reserva.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cancha } from '../cancha/cancha.entity.js';

@Entity()
export class Turno extends BaseEntity {
  @Property({ nullable: false })
  hora_ini!: string;
  @Property({ nullable: false })
  hora_fin!: string;
  @ManyToMany(() => Cancha, (cancha) => cancha.turnos)
  canchas = new Collection<Cancha>(this);
  @OneToMany(() => Reserva, (reserva) => reserva.turno, {
    cascade: [Cascade.ALL],
  })
  reservas = new Collection<Reserva>(this);
}
