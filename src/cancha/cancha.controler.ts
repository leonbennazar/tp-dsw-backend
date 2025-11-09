import { NextFunction, Request, Response } from 'express';
import { Cancha } from './cancha.entity.js';
import { orm } from '../shared/db/orm.js';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

function sanitizedCanchaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    numero: Number(req.body.numero),
    nombre: req.body.nombre,
    tipo_turno: req.body.tipo_turno,
    tamanio: Number(req.body.tamanio) || null,
    tipo: Number(req.body.tipo) || null,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  // aca se deberian hacer mas validaciones que luego vamos a ver, como el tipo de dato, que no haya contenido malisioso, operaciones extrañas, etc
  next();
}

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const canchas = await em.find(
      Cancha,
      {},
      { populate: ['tamanio', 'tipo'] }
    );
    res.status(200).json({ messae: 'canchas encontradas', data: canchas });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cancha = await em.findOneOrFail(
      Cancha,
      { id },
      { populate: ['tamanio', 'tipo'] }
    );
    res.status(200).json({ message: 'Tamaño encontrado', data: cancha });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const cancha = em.create(Cancha, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Tamaño creado', data: cancha });
  } catch (error: any) {
    if (error instanceof UniqueConstraintViolationException) {
      return res.status(409).json({
        message: 'Ya existe una cancha con dicho tamaño',
      });
    }

    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function update(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

//la funcion delete tira error, ni meca sabe por que, asi que se cambio a remove
async function remove(req: Request, res: Response) {
  res.status(500).json({ message: 'no implementado' });
}

export { sanitizedCanchaInput, findAll, findOne, add, update, remove };
