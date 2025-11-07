import { Repository } from '../shared/repository.js';
import { Cancha } from './cancha.entity.js';
import { pool } from '../shared/db/conn.mysql.js';
import { RowDataPacket } from 'mysql2';
import { ResultSetHeader } from 'mysql2';

export class CanchaRepository implements Repository<Cancha> {

  public async findAll(): Promise<Cancha[] | undefined> {
    const [canchas] = await pool.query('select * from cancha') //obtiene el listado completode canchas, el retorno es RowDataPacket
    //tendriamos que buscar para cada cancha los turnos que corresponden
    return canchas as Cancha[]
  }

  public async findOne(item: { id: number }): Promise<Cancha | undefined> {
    const id = item.id
    const [canchas] = await pool.query<RowDataPacket[]>('select * from cancha where id_cancha = ?',
    [id]) 
    if(canchas.length === 0){
      return undefined
    }
    const cancha = canchas[0] as Cancha
    return cancha
  }


  public async add(canchaInput: Cancha): Promise<Cancha | undefined> {
    const { id,...canchaRow } = canchaInput
    const [result] = await pool.query<ResultSetHeader>('insert into cancha set ?', [canchaRow])
    
    canchaInput.id = result.insertId

    return canchaInput
  }
  


  public update(id: number): Promise<Cancha | undefined> {
  throw new Error ('No implemented')
  }


  public delete(item: { id: number }): Promise<Cancha | undefined> {
    throw new Error ('No implemented')
  }
} 
