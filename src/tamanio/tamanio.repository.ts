import { Repository } from '../shared/repository.js';
import { Tamanio } from './tamanio.entity.js';
import { pool } from '../shared/db/conn.mysql.js';
import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2';

export class TamanioRepository implements Repository<Tamanio> {
  public async findAll(): Promise<Tamanio[] | undefined> {
    const [tamanios] = await pool.query('select * from tamanio');

    return tamanios as Tamanio[];
  }

  public async findOne(item: { id: number }): Promise<Tamanio | undefined> {
    const id = item.id;
    const [tamanios] = await pool.query<RowDataPacket[]>(
      'select * from tamanio where id_tamanio = ?',
      [id]
    );
    if (tamanios.length === 0) {
      return undefined;
    }
    const tamanio = tamanios[0] as Tamanio;
    return tamanio;
  }
  public async add(tamanioInput: Tamanio): Promise<Tamanio | undefined> {
    const { id, ...tamanioRow } = tamanioInput;
    const [result] = await pool.query<ResultSetHeader>(
      'insert into tamanio set ?',
      [tamanioRow]
    );

    tamanioInput.id = result.insertId;

    return tamanioInput;
  }

  public async update(
    id: number,
    tamanioInput: Tamanio
  ): Promise<Tamanio | undefined> {
    const tamanioRow = { ...tamanioInput };
    await pool.query('update tamanio set ? where id_tamanio = ?', [
      tamanioRow,
      id,
    ]);

    return await this.findOne({ id });
  }

  public async delete(item: { id: number }): Promise<Tamanio | undefined> {
    try {
      const tamanioToDelete = await this.findOne(item);

      await pool.query('delete from tamanio where id_tamanio = ?', [item.id]);
      return tamanioToDelete;
    } catch (error: any) {
      throw new Error('unable to delete tamanio');
    }
  }
}
