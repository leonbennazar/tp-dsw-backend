export class Tipo {
  private static asigID: number = 1;
  constructor(
    public nombre: string,
    public piso: string,
    public techo: 'con_techo' | 'sin_techo',
    public id = Tipo.asigID++
  ) {}
}
