import { NextFunction, Request, Response } from 'express';
import { TamanioRepository } from './tamanio.repository.js';
import { Tamanio } from './tamanio.entity.js';

const tamanioRepository = new TamanioRepository();

function sanitizedTamanioInput(req: Request,res: Response,next: NextFunction) {
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

function findAll(req: Request, res: Response) {
    res.json({ data: tamanioRepository.findAll() });
};

function findOne(req: Request, res:Response) {
    const tamanio = tamanioRepository.findOne({
    capacidad_x_equipo: Number(req.params.capacidad_x_equipo),
    });
    if (!tamanio) {
        return res.status(404).send({ message: 'Tamaño no encontrado' });
    }
    return res.json(tamanio);
};

function add(req: Request, res:Response){
    const input = req.body.sanitizedInput;
    const tamanioInput = new Tamanio(
    input.capacidad_x_equipo,
    input.ancho,
    input.largo
    );
    const tamanio = tamanioRepository.add(tamanioInput);
    return res.status(201).send({ message: 'Tamaño creado', data: tamanio });
};

function update(req: Request, res:Response){
    req.body.sanitizedInput.capacidad_x_equipo = req.params.capacidad_x_equipo;
    const tamanio = tamanioRepository.update(req.body.sanitizedInpu);
    if (!tamanio) {
        return res.status(404).send({ menssage: 'Tamaño no encontrado' });
    }
    return res.status(200).send({menssage: 'El tamaño se actualizo correctamente',data: tamanio,});
};


function remove(req: Request, res:Response) {
    const capacidad_x_equipo = Number(req.params.capacidad_x_equipo);
    const tamanio = tamanioRepository.delete({ capacidad_x_equipo });

    if (!tamanio) {
        res.status(404).send({ menssage: 'Tamaño no encontrado' });
    } else {
        res.status(200).send({ message: 'Tamaño eliminado correctamente' });
    }
};


export {sanitizedTamanioInput, findAll, findOne, add, update, remove}