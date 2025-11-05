export class Cancha {
  private static asigID: number = 1;
  constructor(
    public numero: number,
    public nombre: string,
    public tipo_turno: 'en_punto' | 'y_media',
    public id: number = Cancha.asigID++
  ) {}
}
