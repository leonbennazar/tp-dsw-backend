import { Router } from 'express';
import {
  sanitizedTipoInput,
  findAll,
  findOne,
  add,
  update,
  remove,
} from './tipo.controler.js';

export const tipoRouter = Router();

tipoRouter.get('/', findAll);
tipoRouter.get('/:id', findOne);
tipoRouter.post('/', sanitizedTipoInput, add);
tipoRouter.patch('/:id', sanitizedTipoInput, update);
tipoRouter.put('/:id', sanitizedTipoInput, update);
tipoRouter.patch('/:id', sanitizedTipoInput, update);
tipoRouter.delete('/:id', remove);
