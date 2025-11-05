import express from 'express';
import cors from 'cors';
import { canchaRouter } from './cancha/cancha.routes.js';
import { reservaRouter } from './reserva/reserva.routes.js';
import { tamanioRouter } from './tamanio/tamanio.routes.js';
import { tipoRouter } from './tipo/tipo.routes.js';
import { turnoRouter } from './turno/turno.routes.js';


const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.use(express.json());

app.use('/api/canchas', canchaRouter)
app.use('/api/reservas', reservaRouter)
app.use('/api/tamanios', tamanioRouter)
app.use('/api/tipos', tipoRouter)
app.use('/api/turnos', turnoRouter)
// podria haber un routes.ts para mandar todas estas rutas ahi y simplificar mas el codigo

app.use((_, res) => {
  return res.status(404).send({ message: 'Direccion no encontrada' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
