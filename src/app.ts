import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Cancha } from './cancha/cancha.entity.js';
import { Turno } from './turno/turno.entity.js';
import { Tipo } from './tipo/tipo.entity.js';
import { Tamanio } from './tamanio/tamanio.entity.js';
import { Usuario } from './usuario/usuario.entity.js';
import { Reserva } from './reserva/reserva.entity.js';
import { CanchaRepository } from './cancha/cancha.repository.js';
import { TurnoRepository } from './turno/turno.repository.js';
import { TipoRepository } from './tipo/tipo.repository.js';
import { UsuarioRepository } from './usuario/usuario.repository.js';
import { TamanioRepository } from './tamanio/tamanio.repository.js';
import { ReservaRepository } from './reserva/reserva.repository.js';
// estos repositories por ahora los dejamos aca

const canchaRepository = new CanchaRepository();
const turnoRepository =new TurnoRepository();
const reservaRepository = new ReservaRepository();
const tipoRepository = new TipoRepository();
const usuarioRepository = new UsuarioRepository();
const tamanioRepository = new TamanioRepository();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

const canchas = [
  new Cancha('eren', 'en_punto'),
  new Cancha('mikasa', 'y_media'),
];

const turnos = [new Turno('16:00', '17:00'), new Turno('17:00', '18:00')];

const tipos = [
  new Tipo('Madera', true),
  new Tipo('cesped', false),
];

const tamanios = [new Tamanio(5, 20, 40), new Tamanio(11, 60, 100)];

const usuarios = [
  new Usuario(
    'Lucca',
    'Moretti',
    'luccam@gmail.com',
    'luccamoretti123',
    'ADMIN'
  ),
  new Usuario(
    'Leon',
    'Juan Bennazar',
    'leonjb@gmail.com',
    'leonjb123',
    'ADMIN'
  ),
];

const reservas = [
  new Reserva(
    'pendiente',
    new Date('2025-11-02T16:00:00'),
    usuarios[0].id,
    turnos[0].id,
    canchas[0].id
  ),
  new Reserva(
    'confirmada',
    new Date('2025-11-01T17:00:00'),
    usuarios[1].id,
    turnos[1].id,
    canchas[1].id
  ),
];

function sanitizedCanchaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    tipo_turno: req.body.tipo_turno,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  // aca se deberian hacer mas validaciones que luego vamos a ver, como el tipo de dato, que no haya contenido malisioso, operaciones extrañas, etc
  next();
}

function sanitizedReservaInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    estado_reserva: req.body.estado_reserva,
    fecha_reserva: req.body.fecha_reserva,
    usuario: req.body.usuario,
    turno: req.body.turno,
    cancha: req.body.cancha,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

function sanitizedTipoInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    piso: req.body.piso,
    techo: req.body.techo,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

function sanitizedTamanioInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    capacidad_x_equipo: Number(req.body.capacidad_x_equipo),
    ancho: Number(req.body.ancho),
    largo: Number(req.body.largo),
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

function sanitizedUsuarioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    contrasenia: req.body.contrasenia,
    tipo: req.body.tipo,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}

function sanitizedTurnoInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    hora_ini: req.body.hora_ini,
    hora_fin: req.body.hora_fin,
  };

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
//se podria agregar alguna funcion para validar los horarios
  next();
}

app.get('/api/canchas', (req, res) => {
  res.json({data: canchaRepository.findAll()});
});

app.get('/api/canchas/:id', (req, res) => {
  const cancha = canchaRepository.findOne({id: Number(req.params.id)}) //necesitamos un objeto q tenga un id
  if(!cancha){
    return res.status(404).send({message: 'Cancha no encontrada'})
  }
  return res.json(cancha);
});

app.post('/api/canchas', sanitizedCanchaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const canchaInput = new Cancha(input.nombre, input.tipo_turno);
  const cancha = canchaRepository.add(canchaInput);
  return res.status(201).send({ message: 'Cancha creada', data: cancha }); //el status indica que el recurso se creo correctamente, mas adelante se detallan los dif tipos de status
});

app.patch('/api/canchas/:id', sanitizedCanchaInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id
  const cancha = canchaRepository.update(req.body.sanitizedInput)
    if (!cancha) {
    return res.status(404).send({ menssage: 'Cancha no encontrada' });
  }

  return res.status(200).send({menssage: 'La cancha se actualizo correctamente',data: canchas});
});

app.delete('/api/canchas/:id', (req, res) => {
  const id = Number(req.params.id);
  const cancha = canchaRepository.delete({ id })

  if (!cancha) {
    res.status(404).send({ message: 'Cancha no encontrada' });
  } else {
    res.status(200).send({ message: 'Cancha eliminada correctamente' });
  }
});

app.get('/api/turnos', (req, res) => {
  res.json({data: turnoRepository.findAll()});
});

app.get('/api/turnos/:id', (req, res) => {
  const turno = turnoRepository.findOne({id: Number(req.params.id)}) //necesitamos un objeto q tenga un id
  if(!turno){
    return res.status(404).send({message: 'Turno no encontrado'})
  }
  return res.json(turno);
});

app.post('/api/turnos', sanitizedTurnoInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const turnoInput = new Turno(input.hora_ini, input.hora_fin);
  const turno = turnoRepository.add(turnoInput);
  return res.status(201).send({ message: 'Turno creado', data: turno });
});

app.patch('/api/turno/:id', sanitizedTurnoInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id
  const turno = turnoRepository.update(req.body.sanitizedInput)
  if (!turno) {
    return res.status(404).send({ menssage: 'Turno no encontrado' });
  }
  return res.status(200).send({menssage: 'El turno se actualizo correctamente',data: turnos});
});

app.delete('/api/turnos/:id', (req, res) => {
  const id = Number(req.params.id);
  const turno = turnoRepository.delete({ id })

  if(!turno){
    res.status(404).send({ message: 'Turno no encontrado' });
  } else {
    res.status(200).send({ message: 'Turno eliminado correctamente' });
  }
});

app.get('/api/tipos', (req, res) => {
  res.json({data: tipoRepository.findAll()});
});

app.get('/api/tipos/:id', (req, res) => {
  const tipo = tipoRepository.findOne({id: Number(req.params.id)}) 
  if(!tipo){
    return res.status(404).send({message: 'Tipo no encontrado'})
  }
  return res.json(tipo);
});

app.post('/api/tipos', sanitizedTipoInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const tipoInput = new Tipo(input.nombre, input.piso, input.techo);
  const tipo = tipoRepository.add(tipoInput);
  return res.status(201).send({ message: 'Tipo creado', data: tipo });
});

app.patch('/api/tipo/:id', sanitizedTipoInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id
  const tipo = tipoRepository.update(req.body.sanitizedInput)
  if (!tipo) {
    return res.status(404).send({ menssage: 'Tipo no encontrado' });
  }
  return res.status(200).send({menssage: 'El tipo se actualizo correctamente',data: tipos});
});

app.delete('/api/tipos/:id', (req, res) => {
  const id = Number(req.params.id);
  const tipo = tipoRepository.delete({ id })

  if (!tipo) {
    res.status(404).send({ message: 'Tipo no encontrado' });
  } else {
    res.status(200).send({ message: 'Tipo eliminado correctamente' });
  }
});

app.get('/api/tamanios', (req, res) => {
  res.json({data: tamanioRepository.findAll()});
});

app.get('/api/tamanios/:capacidad_x_equipo', (req, res) => {
  const tamanio = tamanioRepository.findOne({capacidad_x_equipo: Number(req.params.capacidad_x_equipo)})
  if(!tamanio){
    return res.status(404).send({message: 'Tamaño no encontrado'})
  }
  return res.json(tamanio);
});

app.post('/api/tamanios', sanitizedTamanioInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const tamanioInput = new Tamanio(input.capacidad_x_equipo,input.ancho,input.largo);
  const tamanio = tamanioRepository.add(tamanioInput);
  return res.status(201).send({ message: 'Tamaño creado', data: tamanio });
});

app.patch('/api/tamanios/:capacidad_x_equipo',sanitizedTamanioInput,(req, res) => {
    req.body.sanitizedInput.capacidad_x_equipo = req.params.capacidad_x_equipo
    const tamanio = tamanioRepository.update(req.body.sanitizedInpu)
    if (!tamanio) {
      return res.status(404).send({ menssage: 'Tamaño no encontrado' });
    }
    return res.status(200).send({menssage: 'El tamaño se actualizo correctamente',data: tamanios});
  }
);

app.delete('/api/tamanios/:capacidad_x_equipo', (req, res) => {
  const capacidad_x_equipo = Number(req.params.capacidad_x_equipo)
  const tamanio = tamanioRepository.delete({ capacidad_x_equipo })

  if (!tamanio) {
    res.status(404).send({ menssage: 'Tamaño no encontrado' });
  } else {
    res.status(200).send({ message: 'Tamaño eliminado correctamente' });
  }
});

app.get('/api/usuarios', (req, res) => {
  res.json({data: usuarioRepository.findAll()});
});

app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarioRepository.findOne({id: Number(req.params.id)}) 
  if(!usuario){
    return res.status(404).send({message: 'Usuario no encontrado'})
  }
  return res.json(usuario);
});

app.post('/api/usuarios', sanitizedReservaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const usuarioInput = new Usuario(input.nombre,input.apellido,input.email,input.contrasenia, input.tipo);
  const usuario = usuarioRepository.add(usuarioInput);
  return res.status(201).send({ message: 'Nuevo usuario creada', data: usuario });
});

app.patch('/api/usuarios/:id', sanitizedUsuarioInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id
  const usuario = usuarioRepository.update(req.body.sanitizedInput)
  if (!usuario){
    return res.status(404).send({ message: 'Usuario no encontrada' });
  }
  return res.status(200).send({ message: 'Usuario actualizada', data: usuarios});
});

app.delete('/api/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarioRepository.delete({ id })
  if (!usuario) {
    res.status(404).send({ message: 'Usuario no encontrada' });
  } else {
    res.status(200).send({ message: 'Usuario eliminada correctamente' });
  }
});

app.get('/api/reservas', (req, res) => {
  res.json({data: reservaRepository.findAll()});
});

app.get('/api/reservas/:id', (req, res) => {
  const reserva = reservaRepository.findOne({id: Number(req.params.id)}) 
  if(!reserva){
    return res.status(404).send({message: 'Reserva no encontrada'})
  }
  return res.json(reserva);
});

app.post('/api/reservas', sanitizedReservaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const reservaInput = new Reserva(input.estado_reserva,input.fecha_reserva,input.usuario,input.turno,input.cancha);
  const reserva = reservaRepository.add(reservaInput);
  return res.status(201).send({ message: 'Reserva creada', data: reserva });
});

app.patch('/api/reservas/:id', sanitizedReservaInput, (req, res) => {
  req.body.sanitizedInput.id = req.params.id

  const reserva = reservaRepository.update(req.body.sanitizedInput)

  if (!reserva){
    return res.status(404).send({ message: 'Reserva no encontrada' });
  }
  return res.status(200).send({ message: 'Reserva actualizada', data: reserva });
});

app.delete('/api/reservas/:id', (req, res) => {
  const id = Number(req.params.id);
  const reserva = reservaRepository.delete({ id })

  if (!reserva) {
    res.status(404).send({ message: 'Reserva no encontrada' });
  } else {
    res.status(200).send({ message: 'Reserva eliminada correctamente' });
  }
});

app.use((_, res) => {
  return res.status(404).send({ message: 'Direccion no encontrada' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
