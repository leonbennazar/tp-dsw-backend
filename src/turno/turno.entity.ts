export class Turno {
  private static asigID: number = 1
  constructor(
    public hora_ini: string,
    public hora_fin: string,
    public id = Turno.asigID++
  ){}
}