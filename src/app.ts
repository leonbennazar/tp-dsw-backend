import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Cancha } from './cancha/cancha.entity.js';
import { Turno } from './turno/turno.entity.js';
import { Material } from './material/material.entity.js';
import { Tamanio } from './tamanio/tamanio.entity.js';
import { Usuario } from './usuario/usuario.entity.js';
import { Reserva } from './reserva/reserva.entity.js';


const app = express();
app.use(cors());
app.use(express.json());

const canchas = [
    new Cancha('eren', 'en_punto'),
    new Cancha('mikasa', 'y_media'),
];

const turnos = [
    new Turno('16:00', '17:00'), 
    new Turno('17:00', '18:00')
];

const materiales = [
    new Material('futsal', 'techado','madera'),
    new Material('Futbol_11', 'sin_techo','cesped')
];

const tamanios = [
    new Tamanio('chica',5,20,40),
    new Tamanio('grande', 11, 60,100)
]

const usuarios = [
    new Usuario('Lucca', 'Moretti','luccam@gmail.com','luccamoretti123','ADMIN'),
    new Usuario('Leon', 'Juan Bennazar','leonjb@gmail.com','leonjb123','ADMIN')
]

const reservas = [
    new Reserva('pendiente',new Date('2025-11-02T16:00:00'),usuarios[0].id,turnos[0].id, canchas[0].id),
    new Reserva('confirmada',new Date('2025-11-01T17:00:00'),usuarios[1].id,turnos[1].id,canchas[1].id)
]

function sanitizedCanchaInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        tipo_turno: req.body.tipo_turno,
    }
    Object.keys(req.body.sanitizedInput).forEach((key)=> {
      if(req.body.sanitizedInput[key] === undefined){
        delete req.body.sanitizedInput[key]
      }
    })
    // aca se deberian hacer mas validaciones que luego vamos a ver, como el tipo de dato, que no haya contenido malisioso, operaciones extrañas, etc
    next()
}

app.get('/api/canchas', (req, res) => {
  res.json(canchas);
});
app.get('/api/turnos', (req, res) => {
  res.json(turnos);
});
app.get('/api/materiales', (req, res) => {
  res.json(materiales);
});
app.get('/api/tamanios', (req, res) => {
  res.json(tamanios);
});
app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});
app.get('/api/reservas', (req, res) => {
  res.json(reservas);
});

app.post('/api/canchas', sanitizedCanchaInput,(req, res) => {
  const input = req.body.sanitizedInput;
  const cancha = new Cancha(input.nombre, input.tipo_turno);
  canchas.push(cancha);
  return res.status(201).send({message: 'Cancha creada', data:cancha}) //el status indica que el recurso se creo correctamente, mas adelante se detallan los dif tipos de status
});

//se cambio el verbo de put a patch, es la misma funcion
app.patch('/api/canchas/:id',sanitizedCanchaInput, (req, res) => {
    const canchaIdx = canchas.findIndex(c => c.id === Number(req.params.id)) //cambia el tipo de dato del id xq es number y req.params.id es string, otra forma es cambiar el tipo de dato del id
    if(canchaIdx===-1){
        return res.status(404).send({menssage: 'Cancha no encontrada'})
    }

    canchas[canchaIdx] = {...canchas[canchaIdx], ...req.body.sanitizedInput} //generamos la modificacion de los datos sobre el objeto

    return res.status(200).send({menssage: 'La cancha se actualizo correctamente', data:canchas[canchaIdx]}) 
})

app.delete('/api/canchas/:id', (req,res)=> {
  const canchaIdx = canchas.findIndex(c => c.id === Number(req.params.id))

  if (canchaIdx === -1){
    res.status(404).send({message: 'Cancha no encontrada'})
  }else{
    canchas.splice(canchaIdx, 1)
    res.status(200).send({message: 'Cancha eliminada correctamente'})
  }
})

app.use((_, res) => {
  return res.status(404).send({ message: 'Direccion no encontrada' })
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
