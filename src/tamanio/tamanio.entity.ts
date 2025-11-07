
export class Tamanio {
  private static asigID: number = 1;
  constructor(
    public capacidad_x_equipo: number,
    public ancho: number,
    public largo: number,
    public id = Tamanio.asigID++
  ) {}
}