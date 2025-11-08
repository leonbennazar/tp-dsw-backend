import { NextFunction, Request, Response } from 'express';
import { Tipo } from './tipo.entity.js';

function sanitizedTipoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    piso: req.body.piso,
    techo: req.body.techo,
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

export { sanitizedTipoInput, findAll, findOne, add, update, remove };
