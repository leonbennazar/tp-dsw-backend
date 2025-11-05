import { Router } from "express";
import { sanitizedTurnoInput, findAll, findOne, update, add, remove } from "./turno.controler.js";

export const turnoRouter = Router()

turnoRouter.get('/', findAll)
turnoRouter.get('/:id', findOne)
turnoRouter.post('/', sanitizedTurnoInput, add)
turnoRouter.put('/:id', sanitizedTurnoInput, update)
turnoRouter.patch('/:id', sanitizedTurnoInput, update)
turnoRouter.delete('/:id', remove)