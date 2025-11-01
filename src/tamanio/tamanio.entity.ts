export class Tamanio {
  private static asigID: number = 1
  constructor(
    public id = Tamanio.asigID++,
    public descripcion: string,
    public capacidad_x_equipo: number,
    public ancho: number,
    public largo: number,
  ) {}
}
