import { Router } from "express";
import { sanitizedReservaInput, findAll, findOne, add, remove, update } from "./reserva.controler.js";

export const reservaRouter = Router()

reservaRouter.get('/', findAll)
reservaRouter.get('/:id', findOne)
reservaRouter.post('/', sanitizedReservaInput, add)
reservaRouter.put('/:id', sanitizedReservaInput, update)
reservaRouter.patch('/:id', sanitizedReservaInput, update)
reservaRouter.delete('/:id', remove)