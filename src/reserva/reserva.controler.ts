import { NextFunction, Request, Response } from 'express';
import { Reserva } from './reserva.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

function sanitizedReservaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    estado_reserva: req.body.estado_reserva,
    fecha_reserva: req.body.fecha_reserva,
    turno: Number(req.body.turno),
    cancha: Number(req.body.cancha),
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const reservas = await em.find(
      Reserva,
      {},
      { populate: ['turno', 'cancha'] }
    );
    res.status(200).json({ message: 'Reservas encontradas', data: reservas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = await em.findOneOrFail(
      Reserva,
      { id },
      { populate: ['turno', 'cancha'] }
    ); // el 2do parametro es un filtro
    res.status(200).json({ message: 'Reserva encontrada', data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const reserva = em.create(Reserva, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Reserva creada', data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = em.getReference(Reserva, id);
    em.assign(reserva, req.body);
    await em.flush();
    res.status(200).json({ message: 'Reserva actualizada', data: reserva });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const reserva = em.getReference(Reserva, id);
    await em.removeAndFlush(reserva);
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedReservaInput, findAll, findOne, add, update, remove };
