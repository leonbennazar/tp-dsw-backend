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

function findAll(req: Request, res: Response) {
    res.json({ data: reservaRepository.findAll() });
};

function findOne(req: Request, res: Response){
    const reserva = reservaRepository.findOne({ id: Number(req.params.id) });
    if (!reserva) {
        return res.status(404).send({ message: 'Reserva no encontrada' });
    }
    return res.json(reserva);
};

function add (req: Request, res: Response) {
    const input = req.body.sanitizedInput;
    const reservaInput = new Reserva(
    input.estado_reserva,
    input.fecha_reserva,
    input.turno,
    input.cancha
    );
    const reserva = reservaRepository.add(reservaInput);
    return res.status(201).send({ message: 'Reserva creada', data: reserva });
};

function update(req: Request, res: Response){
    req.body.sanitizedInput.id = req.params.id;

    const reserva = reservaRepository.update(req.body.sanitizedInput);

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
