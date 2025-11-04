import { Repository } from "../shared/repository.js";
import {Material} from "./material.entity.js";

const materiales = [
  new Material('futsal', 'techado', 'madera'),
  new Material('Futbol_11', 'sin_techo', 'cesped'),
];



export class MaterialRepository implements Repository<Material>{

    public findAll(): Material[] | undefined {
        return materiales
    }

    public findOne(item:{id: number;}): Material | undefined {
        return materiales.find((material) => material.id === item.id )
    }
    
    public add(item: Material): Material | undefined {
        materiales.push(item)
        return item
    }
    
    public update(item: Material): Material | undefined {
        const materialIdx = materiales.findIndex((material) => material.id === Number(item.id));
        if (materialIdx != -1){
            materiales[materialIdx] = { ...materiales[materialIdx], ...item}
        }
        return materiales[materialIdx]
    }

    public delete(item:{id: number;}): Material | undefined {
        const materialIdx = materiales.findIndex((m) => m.id === Number(item.id));

        if (materialIdx != -1) {
            const deleteMaterial = materiales[materialIdx]
            materiales.splice(materialIdx, 1);
            return deleteMaterial
        }
    };
    }
