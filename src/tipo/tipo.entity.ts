
export class Tipo {
  private static asigID: number = 1
  constructor(
    public nombre: string,
    public techo: boolean,
    public id = Tipo.asigID++,
  ) {}
}
