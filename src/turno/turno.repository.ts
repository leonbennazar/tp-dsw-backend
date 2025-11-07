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

    public async update(id: number): Promise<Turno | undefined> {
        throw new Error ('No implemented')
    }

    public async delete(item: { id: number }): Promise<Turno | undefined> {
        throw new Error ('No implemented')
    }
} 
