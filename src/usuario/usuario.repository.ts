import { Repository } from "../shared/repository.js";
import {Usuario} from "./usuario.entity.js";

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


export class UsuarioRepository implements Repository<Usuario>{

    public findAll(): Usuario[] | undefined {
        return usuarios
    }

    public findOne(item:{id: number;}): Usuario | undefined {
        return usuarios.find((usuario) => usuario.id === item.id )
    }
    
    public add(item: Usuario): Usuario | undefined {
        usuarios.push(item)
        return item
    }
    
    public update(item: Usuario): Usuario | undefined {
        const usuarioIdx = usuarios.findIndex((usuario) => usuario.id === Number(item.id));
        if (usuarioIdx != -1){
            usuarios[usuarioIdx] = { ...usuarios[usuarioIdx], ...item}
        }
        return usuarios[usuarioIdx]
    }

    public delete(item: { id: number }): Usuario | undefined {
        const usuarioIdx = usuarios.findIndex((m) => m.id === item.id);

        if (usuarioIdx != -1) {
            const deleteUsuario = usuarios[usuarioIdx]
            usuarios.splice(usuarioIdx, 1);
            return deleteUsuario
        }
    };
    }
