import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { canchaRouter } from './cancha/cancha.routes.js';
import { reservaRouter } from './reserva/reserva.routes.js';
import { tamanioRouter } from './tamanio/tamanio.routes.js';
import { tipoRouter } from './tipo/tipo.routes.js';
import { turnoRouter } from './turno/turno.routes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

//luego de los middlewares base como express y cors
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
//antes de las rutas y middlewares de negocio

app.use(express.json());

app.use('/api/canchas', canchaRouter);
app.use('/api/reservas', reservaRouter);
app.use('/api/tamanios', tamanioRouter);
app.use('/api/tipos', tipoRouter);
app.use('/api/turnos', turnoRouter);
// podria haber un routes.ts para mandar todas estas rutas ahi y simplificar mas el codigo

app.use((_, res) => {
  return res.status(404).send({ message: 'Direccion no encontrada' });
});

await syncSchema(); //SOLO EN DESAROLLO

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
