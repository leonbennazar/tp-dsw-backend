import { Repository } from "../shared/repository.js";
import {Reserva} from "./reserva.entity.js";
import { CanchaRepository } from "../cancha/cancha.repository.js";
import { TurnoRepository } from "../turno/turno.repository.js";
import { pool } from "../shared/db/conn.mysql.js";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

const canchaRepository = new CanchaRepository();

const turnoRepository = new TurnoRepository();



export class ReservaRepository implements Repository<Reserva>{

    public async findAll(): Promise<Reserva[] | undefined> {
        const [reservas] = await pool.query(
            'select r.*, c.nombre AS nombre_cancha, t.hora_ini, t.hora_fin from reserva r join cancha c on r.id_cancha = c.id_cancha join turno t on r.id_turno = t.id_turno;') 
        
        return reservas as Reserva[]
    }

    public async findOne(item: { id: number }): Promise<Reserva | undefined> {
        const id = item.id
        const [reservas] = await pool.query<RowDataPacket[]>(
            'select r.*, c.nombre AS nombre_cancha, t.hora_ini, t.hora_fin from reserva r join cancha c on r.id_cancha = c.id_cancha join turno t on r.id_turno = t.id_turno where id_reserva = ?',
            [id]) 
        if(reservas.length === 0){
            return undefined
        }
        const reserva = reservas[0] as Reserva
        return reserva
    }

    public async add(reservaInput: Reserva): Promise<Reserva | undefined> {
        const { id,...reservaRow } = reservaInput
        const [result] = await pool.query<ResultSetHeader>('insert into reserva set ?', [reservaRow])
    
        reservaInput.id = result.insertId

        return reservaInput
    }

    public async update(id: number,reservaInput: Reserva): Promise<Reserva | undefined> {
        const reservaRow = { ...reservaInput };
        await pool.query('update reserva set ? where id_reserva = ?',
        [reservaRow, id])
    
    return await this.findOne({id})  
    }

    public async delete(item: { id: number }): Promise<Reserva | undefined> {
    try{
        const reservaToDelete = await this.findOne(item)

        await pool.query('delete from reserva where id_reserva = ?',
        [item.id])
        return reservaToDelete
    }catch(error:any){
        throw new Error('unable to delete reserva')
    }
    }
} 

