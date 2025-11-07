import { Repository } from "../shared/repository.js";
import {Turno} from "./turno.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

export class TurnoRepository implements Repository<Turno>{

    public async findAll(): Promise<Turno[] | undefined> {
        const [turnos] = await pool.query('select * from turno') 
        
        return turnos as Turno[]
    }
    public async findOne(item: { id: number }): Promise<Turno | undefined> {
        const id = item.id
        const [turnos] = await pool.query<RowDataPacket[]>('select * from turno where id_turno = ?',
        [id]) 
        if(turnos.length === 0){
            return undefined
        }
        const turno = turnos[0] as Turno
        return turno
    }

    public async add(turnoInput: Turno): Promise<Turno | undefined> {
        const { id,...turnoRow } = turnoInput
        const [result] = await pool.query<ResultSetHeader>('insert into turno set ?', [turnoRow])
    
        turnoInput.id = result.insertId

        return turnoInput
    }

    public async update(id: number, turnoInput: Turno): Promise<Turno | undefined> {
    const turnoRow = { ...turnoInput };
    await pool.query('update turno set ? where id_turno = ?',
    [turnoRow, id])
    
    return await this.findOne({id})  
    }

    public async delete(item: { id: number }): Promise<Turno | undefined> {
    try{
        const turnoToDelete = await this.findOne(item)

        await pool.query('delete from turno where id_turno = ?',
        [item.id])
        return turnoToDelete
    }catch(error:any){
        throw new Error('unable to delete turno')
    }
    }
} 
