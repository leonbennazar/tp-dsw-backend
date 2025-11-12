import { NextFunction, Request, Response } from 'express';
import { orm } from '../shared/db/orm.js';
import { Tamanio } from './tamanio.entity.js';
import { UniqueConstraintViolationException } from '@mikro-orm/core';

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

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const tamanios = await em.find(Tamanio, {});
    res.status(200).json({ messae: 'Tamaños encontrados', data: tamanios });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tamanio = await em.findOneOrFail(Tamanio, { id });
    res.status(200).json({ message: 'Tamaño encontrado', data: tamanio });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const tamanio = em.create(Tamanio, req.body.sanitizedInput); //no es una operacion async, no accede a la base de datos
    await em.flush(); //aca si. Se ejecuta una sola vez, es un commit
    res.status(200).json({ message: 'Tamaño creado', data: tamanio });
  } catch (error: any) {
    if (error instanceof UniqueConstraintViolationException) {
      return res.status(409).json({
        message: 'Ya exite un tamaño con dicha capacidad de equipo',
      });
    }
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tamanio = em.getReference(Tamanio, id);
    em.assign(tamanio, req.body);
    await em.flush();
    res.status(200).json({ message: 'Tamanio actualizado' });
  } catch (error: any) {
    if (error instanceof UniqueConstraintViolationException) {
      return res.status(409).json({
        message: 'Ya exite un tamaño con dicha capacidad de equipo',
      });
    }
    res.status(500).json({ message: error.messae });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tamanio = em.getReference(Tamanio, id);
    await em.removeAndFlush(tamanio);
    res.status(200).json({ message: 'Tamanio eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.messae });
  }
}

export { sanitizedTamanioInput, findAll, findOne, add, update, remove };
