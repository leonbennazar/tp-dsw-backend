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

    public async update(id: number, tipoInput: Tipo): Promise<Tipo | undefined> {
      const tipoRow = { ...tipoInput };
      await pool.query('update tipo set ? where id_tipo = ?',
      [tipoRow, id])
    
      return await this.findOne({id})  
    }

    public async delete(item: { id: number }): Promise<Tipo | undefined> {
    try{
        const tipoToDelete = await this.findOne(item)

        await pool.query('delete from tipo where id_tipo = ?',
        [item.id])
        return tipoToDelete
    }catch(error:any){
        throw new Error('unable to delete tipo')
    }
    }
} 
