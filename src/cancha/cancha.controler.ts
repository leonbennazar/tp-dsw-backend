import { NextFunction, Request, Response } from 'express';
import { Cancha } from './cancha.entity.js';

function sanitizedCanchaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    numero: Number(req.body.numero),
    nombre: req.body.nombre,
    tipo_turno: req.body.tipo_turno,
    id_tamanio: Number(req.body.id_tamanio) || null,
    id_tipo: Number(req.body.id_tipo) || null,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  // aca se deberian hacer mas validaciones que luego vamos a ver, como el tipo de dato, que no haya contenido malisioso, operaciones extrañas, etc
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

async function update(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

//la funcion delete tira error, ni meca sabe por que, asi que se cambio a remove
async function remove(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

export { sanitizedCanchaInput, findAll, findOne, add, update, remove };
