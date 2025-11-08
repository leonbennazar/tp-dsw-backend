import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity';
import { Cancha } from '../cancha/cancha.entity';
import { Turno } from '../turno/turno.entity';

@Entity()
export class Reserva extends BaseEntity {
  @Property({ nullable: false })
  estado_reserva!: 'pendiente' | 'confirmada' | 'cancelada';
  @Property({ type: 'date', nullable: false })
  fecha_reserva!: Date;
  @ManyToOne(() => Turno, { nullable: false })
  turno!: Turno;
  @ManyToOne(() => Cancha, { nullable: false })
  cancha!: Cancha;
}
