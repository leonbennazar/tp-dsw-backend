export class Turno {
  private static asigID: number = 1;
  public id: number;
  public hora_ini: string;
  public hora_fin: string;

  constructor(nombre: string, tipo_turno: string) {
    this.id = Turno.asigID++;
    this.hora_ini = nombre;
    this.hora_fin = tipo_turno;
  }
}
