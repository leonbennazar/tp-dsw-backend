import { NextFunction, Request, Response } from 'express';
import { Tipo } from './tipo.entity.js';
import { orm } from '../shared/db/orm.js';

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

const em = orm.em;

async function findAll(req: Request, res: Response) {
  try {
    const tipos = await em.find(Tipo, {});
    res.status(200).json({ messae: 'Tipos encontrados', data: tipos });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipo = await em.findOneOrFail(Tipo, { id });
    res.status(200).json({ message: 'Tipo encontrado', data: tipo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const tipo = em.create(Tipo, req.body.sanitizedInput); //no es una operacion async, no accede a la base de datos
    await em.flush(); //aca si. Se ejecuta una sola vez, es un commit
    res.status(200).json({ message: 'Tipo creado', data: tipo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipo = em.getReference(Tipo, id);
    em.assign(tipo, req.body);
    await em.flush();
    res.status(200).json({ message: 'Tipo actualizado' });
  } catch (error: any) {
    res.status(500).json({ message: error.messae });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipo = em.getReference(Tipo, id);
    await em.removeAndFlush(tipo);
    res.status(200).json({ message: 'Tipo eliminado' });
  } catch (error: any) {
    res.status(500).json({ message: error.messae });
  }
}

export { sanitizedTipoInput, findAll, findOne, add, update, remove };
