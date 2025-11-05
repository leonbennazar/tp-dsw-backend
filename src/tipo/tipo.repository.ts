import { Repository } from '../shared/repository.js';
import { Tipo } from './tipo.entity.js';

const tipos = [
  new Tipo('Futsal', 'madera', 'con_techo'),
  new Tipo('Exterior', 'cesped', 'sin_techo'),
];

export class TipoRepository implements Repository<Tipo> {
  public findAll(): Tipo[] | undefined {
    return tipos;
  }

  public findOne(item: { id: number }): Tipo | undefined {
    return tipos.find((tipo) => tipo.id === item.id);
  }

  public add(item: Tipo): Tipo | undefined {
    tipos.push(item);
    return item;
  }

  public update(item: Tipo): Tipo | undefined {
    const tipoIdx = tipos.findIndex((tipo) => tipo.id === Number(item.id));
    if (tipoIdx != -1) {
      tipos[tipoIdx] = { ...tipos[tipoIdx], ...item };
    }
    return tipos[tipoIdx];
  }

  public delete(item: { id: number }): Tipo | undefined {
    const tipoIdx = tipos.findIndex((t) => t.id === item.id);

    if (tipoIdx != -1) {
      const deleteTipo = tipos[tipoIdx];
      tipos.splice(tipoIdx, 1);
      return deleteTipo;
    }
  }
}
