import { Repository } from "../shared/repository.js";
import {Reserva} from "./reserva.entity.js";
import { CanchaRepository } from "../cancha/cancha.repository.js";
import { TurnoRepository } from "../turno/turno.repository.js";

const canchaRepository = new CanchaRepository();
const canchas = canchaRepository.findAll() !; //El ! (non-null assertion operator) le dice a TypeScript:confía en mí, esto nunca será undefined

const turnoRepository = new TurnoRepository();
const turnos = turnoRepository.findAll()!;

const reservas = [
    new Reserva(
    'pendiente',
    new Date('2025-11-02T16:00:00'),
    turnos[0].id,
    canchas[0].id
    ),
    new Reserva(
    'confirmada',
    new Date('2025-11-01T17:00:00'),
    turnos[1].id,
    canchas[1].id
    ),
];


export class ReservaRepository implements Repository<Reserva>{

    public findAll(): Reserva[] | undefined {
        return reservas
    }

    public findOne(item:{id: number;}): Reserva | undefined {
        return reservas.find((reserva) => reserva.id === item.id )
    }
    
    public add(item: Reserva): Reserva | undefined {
        reservas.push(item)
        return item
    }
    
    public update(item: Reserva): Reserva | undefined {
        const reservaIdx = reservas.findIndex((reserva) => reserva.id === Number(item.id));
        if (reservaIdx != -1){
            reservas[reservaIdx] = { ...reservas[reservaIdx], ...item}
        }
        return reservas[reservaIdx]
    }

    public delete(item: { id: number }): Reserva | undefined {
        const reservaIdx = reservas.findIndex((r) => r.id ===item.id);

        if (reservaIdx != -1) {
            const deleteReserva = reservas[reservaIdx]
            reservas.splice(reservaIdx, 1);
            return deleteReserva
        }
    };
    }
