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
import { Tamanio } from '../tamanio/tamanio.entity';
import { Tipo } from '../tipo/tipo.entity';
import { Turno } from '../turno/turno.entity';
import { Reserva } from '../reserva/reserva.entity';

@Entity()
export class Cancha extends BaseEntity {
  @Property({ nullable: false, unique: true })
  numero!: number;
  @Property({ nullable: false })
  nombre!: string;
  @Property({ nullable: false })
  tipo_turno!: 'en_punto' | 'y_media';

  @ManyToOne(() => Tamanio, { nullable: true })
  tamanio!: Tamanio;

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
