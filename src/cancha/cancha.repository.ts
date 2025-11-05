import { Repository } from "../shared/repository.js";
import {Cancha} from "./cancha.entity.js";

const canchas = [
  new Cancha('eren', 'en_punto'),
  new Cancha('mikasa', 'y_media'),
];



export class CanchaRepository implements Repository<Cancha>{

    public findAll(): Cancha[] | undefined {
        return canchas
    }

    public findOne(item:{id: number;}): Cancha | undefined {
        return canchas.find((cancha) => cancha.id === item.id )
    }
    
    public add(item: Cancha): Cancha | undefined {
        canchas.push(item)
        return item
    }
    
    public update(item: Cancha): Cancha | undefined {
        const canchaIdx = canchas.findIndex((cancha) => cancha.id === Number(item.id));
        if (canchaIdx != -1){
            canchas[canchaIdx] = { ...canchas[canchaIdx], ...item}
        }
        return canchas[canchaIdx]
    }

    public delete(item: { id: number }): Cancha | undefined {
        const canchaIdx = canchas.findIndex((c) => c.id === item.id);

        if (canchaIdx != -1) {
            const deleteCancha = canchas[canchaIdx]
            canchas.splice(canchaIdx, 1);
            return deleteCancha;
        }
    };
    }
