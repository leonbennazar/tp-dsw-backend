import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { Cancha } from './cancha/cancha.entity.js';
import { Turno } from './turno/turno.entity.js';
import { Material } from './material/material.entity.js';
import { Tamanio } from './tamanio/tamanio.entity.js';
import { Usuario } from './usuario/usuario.entity.js';
import { Reserva } from './reserva/reserva.entity.js';
import { CanchaRepository } from './cancha/cancha.repository.js';
import { TurnoRepository } from './turno/turno.repository.js';
import { MaterialRepository } from './material/material.repository.js';
import { UsuarioRepository } from './usuario/usuario.repository.js';
import { TamanioRepository } from './tamanio/tamanio.repository.js';
import { ReservaRepository } from './reserva/reserva.repository.js';
// estos repositories por ahora los dejamos aca

const canchaRespository = new CanchaRepository();
const turnoRepository =new TurnoRepository();
const reservaRepository = new ReservaRepository();
const materialRespository = new MaterialRepository();
const usuarioRespository = new UsuarioRepository();
const tamanioRespository = new TamanioRepository();


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

const materiales = [
  new Material('futsal', 'techado', 'madera'),
  new Material('Futbol_11', 'sin_techo', 'cesped'),
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

function sanitizedMaterialInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    descripcion: req.body.descripcion,
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
  res.json({data: canchaRespository.findAll()});
});

app.get('/api/canchas/:id', (req, res) => {
  const cancha = canchas.find((cancha) => cancha.id === Number(req.params.id));
  return res.json(cancha);
});

app.post('/api/canchas', sanitizedCanchaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const cancha = new Cancha(input.nombre, input.tipo_turno);
  canchas.push(cancha);
  return res.status(201).send({ message: 'Cancha creada', data: cancha }); //el status indica que el recurso se creo correctamente, mas adelante se detallan los dif tipos de status
});

//se cambio el verbo de put a patch, es la misma funcion
app.patch('/api/canchas/:id', sanitizedCanchaInput, (req, res) => {
  const canchaIdx = canchas.findIndex((c) => c.id === Number(req.params.id)); //cambia el tipo de dato del id xq es number y req.params.id es string, otra forma es cambiar el tipo de dato del id
  if (canchaIdx === -1) {
    return res.status(404).send({ menssage: 'Cancha no encontrada' });
  }

  canchas[canchaIdx] = { ...canchas[canchaIdx], ...req.body.sanitizedInput }; //generamos la modificacion de los datos sobre el objeto

  return res.status(200).send({
    menssage: 'La cancha se actualizo correctamente',
    data: canchas[canchaIdx],
  });
});

app.delete('/api/canchas/:id', (req, res) => {
  const canchaIdx = canchas.findIndex((c) => c.id === Number(req.params.id));

  if (canchaIdx === -1) {
    res.status(404).send({ message: 'Cancha no encontrada' });
  } else {
    canchas.splice(canchaIdx, 1);
    res.status(200).send({ message: 'Cancha eliminada correctamente' });
  }
});

app.get('/api/turnos', (req, res) => {
  res.json(turnos);
});

app.get('/api/turnos/:id', (req, res) => {
  const turno = turnos.find((turno) => turno.id === Number(req.params.id));
  return res.json(turno);
});

app.post('/api/turnos', sanitizedTurnoInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const turno = new Turno(input.hora_ini, input.hora_fin);
  turnos.push(turno);
  return res.status(201).send({ message: 'Turno creado', data: turno });
});

app.patch('/api/turno/:id', sanitizedTurnoInput, (req, res) => {
  const turnoIdx = turnos.findIndex((t) => t.id === Number(req.params.id));
  if (turnoIdx === -1) {
    return res.status(404).send({ menssage: 'Turno no encontrado' });
  }

  canchas[turnoIdx] = {...turnos[turnoIdx],...req.body.sanitizedInput,};

  return res.status(200).send({
    menssage: 'El turno se actualizo correctamente',
    data: turnos[turnoIdx],
  });
});

app.delete('/api/turnos/:id', (req, res) => {
  const turnosIdx = turnos.findIndex((t) => t.id === Number(req.params.id));

  if (turnosIdx === -1) {
    res.status(404).send({ message: 'Turno no encontrado' });
  } else {
    turnos.splice(turnosIdx, 1);
    res.status(200).send({ message: 'Turno eliminado correctamente' });
  }
});

app.get('/api/materiales', (req, res) => {
  res.json(materiales);
});
app.get('/api/materiales/:id', (req, res) => {
  const material = materiales.find(
    (material) => material.id === Number(req.params.id)
  );
  return res.json(material);
});

app.post('/api/materiales', sanitizedMaterialInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const material = new Material(input.descripcion, input.piso, input.techo);
  materiales.push(material);
  return res.status(201).send({ message: 'Material creada', data: material });
});

app.patch('/api/material/:id', sanitizedMaterialInput, (req, res) => {
  const materialIdx = materiales.findIndex((m) => m.id === Number(req.params.id));
  if (materialIdx === -1) {
    return res.status(404).send({ menssage: 'Material no encontrado' });
  }

  canchas[materialIdx] = {...materiales[materialIdx],...req.body.sanitizedInput,};

  return res.status(200).send({
    menssage: 'El material se actualizo correctamente',
    data: materiales[materialIdx],
  });
});

app.delete('/api/materiales/:id', (req, res) => {
  const materialIdx = materiales.findIndex(
    (m) => m.id === Number(req.params.id)
  );

  if (materialIdx === -1) {
    res.status(404).send({ message: 'Material no encontrado' });
  } else {
    materiales.splice(materialIdx, 1);
    res.status(200).send({ message: 'Material eliminado correctamente' });
  }
});

app.get('/api/tamanios', (req, res) => {
  res.json(tamanios);
});
app.get('/api/tamanios/:capacidad_x_equipo', (req, res) => {
  const tamanio = tamanios.find(
    (tamanio) =>
      tamanio.capacidad_x_equipo === Number(req.params.capacidad_x_equipo)
  );
  return res.json(tamanio);
});

app.post('/api/tamanios', sanitizedTamanioInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const tamanio = new Tamanio(input.capacidad_x_equipo,input.ancho,input.largo);
  tamanios.push(tamanio);
  return res.status(201).send({ message: 'Tamaño creado', data: tamanio });
});

app.patch('/api/tamanios/:capacidad_x_equipo',sanitizedTamanioInput,(req, res) => {
    const tamanioIdx = tamanios.findIndex((t) => t.capacidad_x_equipo === Number(req.params.capacidad_x_equipo));
    if (tamanioIdx === -1) {
      return res.status(404).send({ menssage: 'Tamaño no encontrado' });
    }

    canchas[tamanioIdx] = {...tamanios[tamanioIdx],...req.body.sanitizedInput,};
    return res.status(200).send({
      menssage: 'El tamaño se actualizo correctamente',
      data: tamanios[tamanioIdx],
    });
  }
);

app.delete('/api/tamanios/:capacidad_x_equipo', (req, res) => {
  const tamanioIdx = tamanios.findIndex((t) => t.capacidad_x_equipo === Number(req.params.capacidad_x_equipo));
  if (tamanioIdx === -1) {
    res.status(404).send({ menssage: 'Tamaño no encontrado' });
  } else {tamanios.splice(tamanioIdx, 1);
    res.status(200).send({ message: 'Tamaño eliminado correctamente' });
  }
});

app.get('/api/usuarios', (req, res) => {
  res.json(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(
    (usuario) => usuario.id === Number(req.params.id)
  );
  return res.json(usuario);
});

app.post('/api/usuarios', sanitizedReservaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const usuario = new Usuario(input.nombre,input.apellido,input.email,input.contrasenia, input.tipo);
  usuarios.push(usuario);
  return res.status(201).send({ message: 'Nuevo usuario creada', data: usuario });
});

app.patch('/api/usuarios/:id', sanitizedUsuarioInput, (req, res) => {
  const usuarioIdx = usuarios.findIndex((u) => u.id === Number(req.params.id));
  if (usuarioIdx === -1)
    return res.status(404).send({ message: 'Usuario no encontrada' });

  usuarios[usuarioIdx] = { ...usuarios[usuarioIdx], ...req.body };
  res.status(200).send({ message: 'Usuario actualizada', data: usuarios[usuarioIdx] });
});

app.delete('/api/usuarios/:id', (req, res) => {
  const usuarioIdx = usuarios.findIndex((u) => u.id === Number(req.params.id));

  if (usuarioIdx === -1) {
    res.status(404).send({ message: 'Usuario no encontrada' });
  } else {
    usuarios.splice(usuarioIdx, 1);
    res.status(200).send({ message: 'Usuario eliminada correctamente' });
  }
});

app.get('/api/reservas', (req, res) => {
  res.json(reservas);
});

app.get('/api/reservas/:id', (req, res) => {
  const reserva = reservas.find(
    (reserva) => reserva.id === Number(req.params.id)
  );
  return res.json(reserva);
});

app.post('/api/reservas', sanitizedReservaInput, (req, res) => {
  const input = req.body.sanitizedInput;
  const reserva = new Reserva(input.estado_reserva,input.fecha_reserva,input.usuario,input.turno,input.cancha);
  reservas.push(reserva);
  return res.status(201).send({ message: 'Reserva creada', data: reserva });
});

app.patch('/api/reservas/:id', sanitizedReservaInput, (req, res) => {
  const reservaIdx = reservas.findIndex((r) => r.id === Number(req.params.id));
  if (reservaIdx === -1)
    return res.status(404).send({ message: 'Reserva no encontrada' });

  reservas[reservaIdx] = { ...reservas[reservaIdx], ...req.body };
  res.status(200).send({ message: 'Reserva actualizada', data: reservas[reservaIdx] });
});

app.delete('/api/reservas/:id', (req, res) => {
  const reservaIdx = reservas.findIndex((r) => r.id === Number(req.params.id));

  if (reservaIdx === -1) {
    res.status(404).send({ message: 'Reserva no encontrada' });
  } else {
    reservas.splice(reservaIdx, 1);
    res.status(200).send({ message: 'Reserva eliminada correctamente' });
  }
});

app.use((_, res) => {
  return res.status(404).send({ message: 'Direccion no encontrada' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});
