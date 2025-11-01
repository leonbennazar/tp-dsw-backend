
export class Material {
  private static asigID: number = 1
  constructor(
    public descripcion: string,
    public piso: string,
    public techo: string,
    public id = Material.asigID++,
  ) {}
}
