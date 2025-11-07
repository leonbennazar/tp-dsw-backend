import { Repository } from '../shared/repository.js';
import { Tipo } from './tipo.entity.js';
import { pool } from '../shared/db/conn.mysql.js';
import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2';

export class TipoRepository implements Repository<Tipo> {
    public async findAll(): Promise<Tipo[] | undefined> {
      const [tipos] = await pool.query('select * from tipo') //obtiene el listado completode canchas, el retorno es RowDataPacket
      
      return tipos as Tipo[]
    }

    public async findOne(item: { id: number }): Promise<Tipo | undefined> {
      const id = item.id
      const [tipos] = await pool.query<RowDataPacket[]>('select * from tipo where id_tipo = ?',
      [id]) 
      if(tipos.length === 0){
        return undefined
      }
      const tipo = tipos[0] as Tipo
      return tipo
    }

    public async add(tipoInput: Tipo): Promise<Tipo | undefined> {
        const { id,...tipoRow } = tipoInput
        const [result] = await pool.query<ResultSetHeader>('insert into tipo set ?', [tipoRow])
    
        tipoInput.id = result.insertId

        return tipoInput
    }

    public async update(id: number): Promise<Tipo | undefined> {
        throw new Error ('No implemented')
    }

    public async delete(item: { id: number }): Promise<Tipo | undefined> {
        throw new Error ('No implemented')
    }
} 
