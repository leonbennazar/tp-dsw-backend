import { Entity, Property, ManyToOne, Rel, Cascade } from '@mikro-orm/core';
import { Turno } from '../turno/turno.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cancha } from '../cancha/cancha.entity.js';

@Entity()
export class Reserva extends BaseEntity {
  @Property({ nullable: false })
  estado_reserva!: 'pendiente' | 'confirmada' | 'cancelada';
  @Property({ type: 'date', nullable: false })
  fecha_reserva!: Date;
  @ManyToOne(() => Turno, { nullable: false })
  turno!: Rel<Turno>;
  @ManyToOne(() => Cancha, { nullable: false, cascade: [Cascade.ALL] },)
  cancha!: Rel<Cancha>;
}
