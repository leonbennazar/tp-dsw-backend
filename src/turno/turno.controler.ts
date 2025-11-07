import express, { NextFunction, Request, Response } from 'express';
import { TurnoRepository } from './turno.repository.js';
import { Turno } from './turno.entity.js';
const turnoRepository = new TurnoRepository();

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

async function findAll(req:Request, res: Response){
    const turnos = await turnoRepository.findAll();
    return res.json({ data: turnos });
}


async function findOne(req: Request, res: Response){
    const turno = await turnoRepository.findOne({ id: Number(req.params.id) }); //necesitamos un objeto q tenga un id
    if (!turno) {
    return res.status(404).send({ message: 'Turno no encontrado' });
    }
    return res.json(turno);
};

async function add(req: Request, res: Response){
    const input = req.body.sanitizedInput;
    const turnoInput = new Turno(input.hora_ini, input.hora_fin);
    
    const turno = await turnoRepository.add(turnoInput);
    return res.status(201).send({ message: 'Turno creado', data: turno });
};

function update(req: Request, res: Response){
    const id = Number(req.params.id);
    const input = req.body.sanitizedInput;
    const turno = turnoRepository.update(id, input);
    
    if (!turno) {
        return res.status(404).send({ menssage: 'Turno no encontrado' });
    }
    return res.status(200).send({ menssage: 'El turno se actualizo correctamente', data: turno });
};

function remove(req: Request, res: Response){
    const id = Number(req.params.id);
    const turno = turnoRepository.delete({ id });

    if (!turno) {
        res.status(404).send({ message: 'Turno no encontrado' });
    } else {
        res.status(200).send({ message: 'Turno eliminado correctamente' });
    }
};


export {sanitizedTurnoInput, findAll, findOne, add, update, remove}