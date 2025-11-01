export class Turno {
  private static asigID: number = 1
  constructor(
  public id = Turno.asigID++,
  public hora_ini: string,
  public hora_fin: string
  ){}
}