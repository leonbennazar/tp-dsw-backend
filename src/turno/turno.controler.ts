import express, { NextFunction, Request, Response } from 'express';
import { Turno } from './turno.entity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em;

function sanitizedTurnoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    hora_ini: req.body.hora_ini,
    hora_fin: req.body.hora_fin,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  //se podria agregar alguna funcion para validar los horarios
  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const turnos = await em.find(Turno, {}, { populate: ['reservas'] });
    res.status(200).json({ message: 'Turnos encontrados', data: turnos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turno = await em.findOneOrFail(
      Turno,
      { id },
      { populate: ['reservas'] }
    );
    res.status(200).json({ message: 'Turno encontrado', data: turno });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const turno = em.create(Turno, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Turno creado', data: turno });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turno = em.getReference(Turno, id);
    em.assign(turno, req.body);
    await em.flush();
    res.status(200).json({ message: 'Turno actualizado', data: turno });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turno = em.getReference(Turno, id);
    await em.removeAndFlush(turno);
    res.status(200).json({ message: 'Turno eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export { sanitizedTurnoInput, findAll, findOne, add, update, remove };
