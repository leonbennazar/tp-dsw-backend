import {
  Entity,
  Property,
  ManyToOne,
  ManyToMany,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity';
import { Cancha } from '../cancha/cancha.entity';
import { Reserva } from '../reserva/reserva.entity';

@Entity()
export class Turno extends BaseEntity {
  @Property({ nullable: false })
  hora_ini!: string;
  @Property({ nullable: false })
  hora_fin!: string;
  @ManyToMany(() => Cancha, (cancha) => cancha.turnos)
  canchas = new Collection<Cancha>(this);
  @OneToMany(() => Reserva, (reseva) => reseva.turno, {
    cascade: [Cascade.ALL],
  })
  reservas = new Collection<Cancha>(this);
}
