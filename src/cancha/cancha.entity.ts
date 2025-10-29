export class Cancha {
  private static asigID: number = 1;
  public id: number;
  public nombre: string;
  public tipo_turno: 'en_punto' | 'y_media';

  constructor(nombre: string, tipo_turno: 'en_punto' | 'y_media') {
    this.id = Cancha.asigID++;
    this.nombre = nombre;
    this.tipo_turno = tipo_turno;
  }
}
