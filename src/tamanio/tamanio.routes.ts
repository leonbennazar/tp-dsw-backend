import { Router } from "express";
import { sanitizedTamanioInput, findAll, findOne, remove, add, update } from "./tamanio.controler.js";

export const tamanioRouter = Router()

tamanioRouter.get('/', findAll)
tamanioRouter.get('/:capacidad_x_equipo', findOne)
tamanioRouter.post('/', sanitizedTamanioInput, add)
tamanioRouter.put('/:capacidad_x_equipo', sanitizedTamanioInput, update)
tamanioRouter.patch('/:capacidad_x_equipo', sanitizedTamanioInput, update)
tamanioRouter.delete('/:capacidad_x_equipo',  remove)