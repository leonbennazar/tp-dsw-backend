import { NextFunction, Request, Response } from 'express';
import { ReservaRepository } from './reserva.repository.js';
import { Reserva } from './reserva.entity.js';

const reservaRepository = new ReservaRepository();

function sanitizedReservaInput(req: Request,res: Response,next: NextFunction) {
    req.body.sanitizedInput = {
    estado_reserva: req.body.estado_reserva,
    fecha_reserva: req.body.fecha_reserva,
    usuario: req.body.usuario,
    turno: req.body.turno,
    cancha: req.body.cancha,
};

Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
    delete req.body.sanitizedInput[key];
    }
});

next();
}

async function findAll(req: Request, res: Response) {
    const reservas = await reservaRepository.findAll();
    return res.json({ data: reservas });
}

async function findOne(req: Request, res: Response) {
    const reserva = await reservaRepository.findOne({ id: Number(req.params.id) });
    if (!reserva) {
        return res.status(404).send({ message: 'Reserva no encontrada' });
    }
    return res.json(reserva);
}

async function add (req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const reservaInput = new Reserva(
    input.estado_reserva,
    input.fecha_reserva,
    input.turno,
    input.cancha
    );
    const reserva = await reservaRepository.add(reservaInput);
    return res.status(201).send({ message: 'Reserva creada', data: reserva });
};

function update(req: Request, res: Response){
    const id = Number(req.params.id);
    const input = req.body.sanitizedInput;
    const reserva = reservaRepository.update(id, input);

    if (!reserva) {
        return res.status(404).send({ message: 'Reserva no encontrada' });
    }
    return res.status(200).send({ message: 'Reserva actualizada', data: reserva });
};

function remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const reserva = reservaRepository.delete({ id });

    if (!reserva) {
        res.status(404).send({ message: 'Reserva no encontrada' });
    } else {
        res.status(200).send({ message: 'Reserva eliminada correctamente' });
    }
};

export {sanitizedReservaInput, findAll, findOne, add, update, remove}
