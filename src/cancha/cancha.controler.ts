import { NextFunction, Request, Response } from 'express';
import { CanchaRepository } from './cancha.repository.js';
import { Cancha } from './cancha.entity.js';
const canchaRepository = new CanchaRepository();

function sanitizedCanchaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    numero: Number(req.body.numero),
    nombre: req.body.nombre,
    tipo_turno: req.body.tipo_turno,
    capacidad_x_equipo: Number(req.body.capacidad_x_equipo) || null,
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

function findAll(req: Request, res: Response) {
  res.json({ data: canchaRepository.findAll() });
}

function findOne(req: Request, res: Response) {
  const cancha = canchaRepository.findOne({ id: Number(req.params.id) });
  if (!cancha) {
    return res.status(404).send({ message: 'Cancha no encontrada' });
  }
  return res.json(cancha);
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedInput;
  const canchaInput = new Cancha(
    input.numero,
    input.nombre,
    input.tipo_turno,
    input.capacidad_x_equipo,
    input.id_tipo
  );
  const cancha = canchaRepository.add(canchaInput);
  return res.status(201).send({ message: 'Cancha creada', data: cancha }); //el status indica que el recurso se creo correctamente, mas adelante se detallan los dif tipos de status
}

function update(req: Request, res: Response) {
  req.body.sanitizedInput.id = Number(req.params.id);
  const cancha = canchaRepository.update(req.body.sanitizedInput);
  if (!cancha) {
    return res.status(404).send({ menssage: 'Cancha no encontrada' });
  }

  return res
    .status(200)
    .send({ menssage: 'La cancha se actualizo correctamente', data: cancha });
}

//la funcion delete tira error, ni meca sabe por que, asi que se cambio a remove
function remove(req: Request, res: Response) {
  const id = Number(req.params.id);
  const cancha = canchaRepository.delete({ id });

  if (!cancha) {
    res.status(404).send({ message: 'Cancha no encontrada' });
  } else {
    res.status(200).send({ message: 'Cancha eliminada correctamente' });
  }
}

export { sanitizedCanchaInput, findAll, findOne, add, update, remove };
