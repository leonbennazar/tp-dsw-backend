
export class Usuario {
  private static asigID: number = 1
  constructor(
    public nombre: string,
    public apellido: string,
    public email: string,
    public contrasenia: string,
    public tipo: 'ADMIN' | 'CLIENTE',
    public id = Usuario.asigID++,
  ) {}
}
