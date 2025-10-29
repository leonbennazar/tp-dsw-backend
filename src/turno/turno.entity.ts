export class Turno {
  private static asigID: number = 1;
  public id: number;
  public hora_ini: string;
  public hora_fin: string;

  constructor(hora_fin: string, hora_ini: string) {
    this.id = Turno.asigID++;
    this.hora_ini = hora_ini;
    this.hora_fin = hora_fin;
  }
}
