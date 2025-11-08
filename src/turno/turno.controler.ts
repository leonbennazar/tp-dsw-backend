import express, { NextFunction, Request, Response } from 'express';
import { Turno } from './turno.entity.js';

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

export { sanitizedTurnoInput, findAll, findOne, add, update, remove };
