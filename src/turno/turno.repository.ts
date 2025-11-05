import { Repository } from "../shared/repository.js";
import {Turno} from "./turno.entity.js";

const turnos = [new Turno('16:00', '17:00'), new Turno('17:00', '18:00')];



export class TurnoRepository implements Repository<Turno>{

    public findAll(): Turno[] | undefined {
        return turnos
    }

    public findOne(item:{id: number;}): Turno | undefined {
        return turnos.find((turno) => turno.id === item.id )
    }
    
    public add(item: Turno): Turno | undefined {
        turnos.push(item)
        return item
    }
    
    public update(item: Turno): Turno | undefined {
        const turnoIdx = turnos.findIndex((turno) => turno.id === Number(item.id));
        if (turnoIdx != -1){
            turnos[turnoIdx] = { ...turnos[turnoIdx], ...item}
        }
        return turnos[turnoIdx]
    }

    public delete(item: { id: number }): Turno | undefined {
        const turnoIdx = turnos.findIndex((t) => t.id === item.id);

        if (turnoIdx != -1) {
            const deleteTurno = turnos[turnoIdx]
            turnos.splice(turnoIdx, 1);
            return deleteTurno
        }
    };
    }
