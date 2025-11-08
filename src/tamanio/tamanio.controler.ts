import { NextFunction, Request, Response } from 'express';
import { Tamanio } from './tamanio.entity.js';

function sanitizedTamanioInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    capacidad_x_equipo: Number(req.body.capacidad_x_equipo),
    ancho: Number(req.body.ancho),
    largo: Number(req.body.largo),
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

export { sanitizedTamanioInput, findAll, findOne, add, update, remove };
