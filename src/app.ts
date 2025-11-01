import express from 'express';
import cors from 'cors';
import { Cancha } from './cancha/cancha.entity.js';
import { Turno } from './turno/turno.entity.js';

const app = express();
app.use(cors());
app.use(express.json());
const canchas = [
  new Cancha('Hola', 'en_punto'),
  new Cancha('que onda', 'y_media'),
];

const turnos = [new Turno('16:00', '17:00'), new Turno('17:00', '18:00')];

app.get('/api/canchas', (req, res) => {
  res.json(canchas);
});
app.get('/api/turnos', (req, res) => {
  res.json(turnos);
});

app.post('/api/canchas', (req, res) => {
  const { nombre, tipo_turno } = req.body;
  const cancha = new Cancha(nombre, tipo_turno);
  canchas.push(cancha);
});

app.use('/', (req, res) => {
  res.send('hola');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
