import { Repository } from "../shared/repository.js";
import {Reserva} from "./reserva.entity.js";
import {Usuario} from "../usuario/usuario.entity.js";
import {Turno} from "../turno/turno.entity.js";
import { CanchaRepository } from "../cancha/cancha.repository.js";

const canchaRepository = new CanchaRepository();
const canchas = canchaRepository.findAll() !; //El ! (non-null assertion operator) le dice a TypeScript:confía en mí, esto nunca será undefined
const usuarios = [
  new Usuario(
    'Lucca',
    'Moretti',
    'luccam@gmail.com',
    'luccamoretti123',
    'ADMIN'
  ),
  new Usuario(
    'Leon',
    'Juan Bennazar',
    'leonjb@gmail.com',
    'leonjb123',
    'ADMIN'
  ),
];
const turnos = [new Turno('16:00', '17:00'), new Turno('17:00', '18:00')];

const reservas = [
  new Reserva(
    'pendiente',
    new Date('2025-11-02T16:00:00'),
    usuarios[0].id,
    turnos[0].id,
    canchas[0].id
  ),
  new Reserva(
    'confirmada',
    new Date('2025-11-01T17:00:00'),
    usuarios[1].id,
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

    public delete(item:{id: number;}): Reserva | undefined {
        const reservaIdx = reservas.findIndex((r) => r.id === Number(item.id));

        if (reservaIdx != -1) {
            const deleteReserva = reservas[reservaIdx]
            reservas.splice(reservaIdx, 1);
            return deleteReserva
        }
    };
    }
