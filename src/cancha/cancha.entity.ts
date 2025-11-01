export class Cancha {
  private static asigID: number = 1
  constructor(
    public id= Cancha.asigID++,
    public nombre: string,
    public tipo_turno: 'en_punto' | 'y_media',
  ){}
}

