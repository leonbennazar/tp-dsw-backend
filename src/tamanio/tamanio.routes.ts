import { Router } from 'express';
import { findAll, findOne, remove, add, update } from './tamanio.controler.js';
import { sanitizedTamanioInput } from './tamanio.controler.js';

export const tamanioRouter = Router();

tamanioRouter.get('/', findAll);
tamanioRouter.get('/:id', findOne);
tamanioRouter.post('/', sanitizedTamanioInput, add);
tamanioRouter.put('/:id', sanitizedTamanioInput, update);
tamanioRouter.delete('/:id', remove);
