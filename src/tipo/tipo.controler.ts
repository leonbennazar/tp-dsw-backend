import { NextFunction, Request, Response } from 'express';
import { TipoRepository } from './tipo.repository.js';
import { Tipo } from './tipo.entity.js';
const tipoRepository = new TipoRepository();

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
  const tipos = await tipoRepository.findAll();
  return res.json({ data: tipos });
}

async function findOne(req: Request, res: Response) {
  const tipo = await tipoRepository.findOne({ id: Number(req.params.id) });
  if (!tipo) {
    return res.status(404).send({ message: 'Tipo no encontrado' });
  }
  return res.json(tipo);
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const tipoInput = new Tipo(input.nombre, input.piso, input.techo);
  
  const tipo = await tipoRepository.add(tipoInput);
  return res.status(201).send({ message: 'Tipo creado', data: tipo });
}

function update(req: Request, res: Response) {
  const id = Number(req.params.id);
  const input = req.body.sanitizedInput;
  
  const tipo = tipoRepository.update(id, input);
  
  if (!tipo) {
    return res.status(404).send({ menssage: 'Tipo no encontrado' });
  }

  return res.status(200).send({ menssage: 'El tipo se actualizo correctamente', data: tipo });
}

function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const tipo = tipoRepository.delete({ id });

  if (!tipo) {
    res.status(404).send({ message: 'Tipo no encontrado' });
  } else {
    res.status(200).send({ message: 'Tipo eliminado correctamente' });
  }
}

export { sanitizedTipoInput, findAll, findOne, add, update, remove };
