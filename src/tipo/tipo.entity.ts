import {
  Entity,
  Property,
  OneToMany,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';
import { Cancha } from '../cancha/cancha.entity.js';

@Entity()
export class Tipo extends BaseEntity {
  @Property({ type: 'string', nullable: false, unique: true })
  nombre!: string;
  @Property({ type: 'string', nullable: false })
  piso!: string;
  @Property({ type: 'string', nullable: false })
  techo!: 'con_techo' | 'sin_techo';

  @OneToMany(() => Cancha, (cancha) => cancha.tipo, {
    //cancha.tipo hace referencia a que, en la clase cancha, el atributo que tiene al es 'tipo'
    cascade: [Cascade.ALL],
  })
  canchas = new Collection<Cancha>(this);
}
