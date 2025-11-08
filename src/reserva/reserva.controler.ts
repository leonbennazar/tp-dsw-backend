import { NextFunction, Request, Response } from 'express';
import { Reserva } from './reserva.entity.js';

function sanitizedReservaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  res.status(500).json({ message: 'no implementado' });
}

async function findOne(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

async function add(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

function update(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

function remove(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

export { sanitizedReservaInput, findAll, findOne, add, update, remove };
