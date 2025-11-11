import { Router } from "express";
import { sanitizedCanchaInput, findAll, findOne, add, update, remove } from "./cancha.controler.js";

export const canchaRouter = Router()

canchaRouter.get('/', findAll)
canchaRouter.get('/:id', findOne)
canchaRouter.post('/', sanitizedCanchaInput, add)
canchaRouter.patch('/:id', sanitizedCanchaInput, update)
canchaRouter.put('/:id', sanitizedCanchaInput, update)
canchaRouter.delete('/:id', remove) 