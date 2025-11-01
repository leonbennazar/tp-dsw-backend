
export class Material {
  private static asigID: number = 1
  constructor(
    public id = Material.asigID++,
    public descripcion: string,
    public piso: string,
    public techo: string,
  ) {}
}
