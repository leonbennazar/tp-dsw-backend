import { Repository } from "../shared/repository.js";
import {Tamanio} from "./tamanio.entity.js";
import { pool } from "../shared/db/conn.mysql.js";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

export class TamanioRepository implements Repository<Tamanio>{

    public async findAll(): Promise<Tamanio[] | undefined> {
        const [tamanios] = await pool.query('select * from tamanio')
        
        return tamanios as Tamanio[]
    }

    public async findOne(item: { capacidad_x_equipo: number }): Promise<Tamanio | undefined> {
        const capacidad_x_equipo = item.capacidad_x_equipo
        const [tamanios] = await pool.query<RowDataPacket[]>('select * from tamanio where capacidad_x_equipo = ?',
        [capacidad_x_equipo]) 
        if(tamanios.length === 0){
            return undefined
        }
        const tamanio = tamanios[0] as Tamanio
        return tamanio
    }

    public async add(tamanioInput: Tamanio): Promise<Tamanio | undefined> {
        const { capacidad_x_equipo,...tamanioRow } = tamanioInput
        const [result] = await pool.query<ResultSetHeader>('insert into tamanio set ?', [tamanioRow])
    
        tamanioInput.capacidad_x_equipo = result.insertId

        return tamanioInput
    }

    public async update(capacidad_x_equipo: number): Promise<Tamanio | undefined> {
        throw new Error ('No implemented')
    }

    public async delete(item: { capacidad_x_equipo: number }): Promise<Tamanio | undefined> {
        throw new Error ('No implemented')
    }
} 
