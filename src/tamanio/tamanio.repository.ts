import { Repository } from "../shared/repository.js";
import {Tamanio} from "./tamanio.entity.js";

const tamanios = [new Tamanio(5, 20, 40), new Tamanio(11, 60, 100)];


export class TamanioRepository implements Repository<Tamanio>{

    public findAll(): Tamanio[] | undefined {
        return tamanios
    }

    public findOne(item:{capacidad_x_equipo: number;}): Tamanio | undefined {
        return tamanios.find((tamanio) =>tamanio.capacidad_x_equipo === item.capacidad_x_equipo )
    }
    
    public add(item: Tamanio): Tamanio | undefined {
        tamanios.push(item)
        return item
    }
    
    public update(item: Tamanio): Tamanio | undefined {
        const tamanioIdx = tamanios.findIndex((tamanio) => tamanio.capacidad_x_equipo === Number(item.capacidad_x_equipo));
        if (tamanioIdx != -1){
            tamanios[tamanioIdx] = { ...tamanios[tamanioIdx], ...item}
        }
        return tamanios[tamanioIdx]
    }

    public delete(item:{capacidad_x_equipo: number;}): Tamanio | undefined {
        const tamanioIdx = tamanios.findIndex((t) => t.capacidad_x_equipo === Number(item.capacidad_x_equipo));

        if (tamanioIdx != -1) {
            const deleteTamanio = tamanios[tamanioIdx]
            tamanios.splice(tamanioIdx, 1);
            return deleteTamanio
        }
    };
    }
