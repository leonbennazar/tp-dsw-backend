
export class Reserva {
  private static asigID: number = 1
  constructor(
    public id = Reserva.asigID++,
    public estado_reserva: 'pendiente' | 'confirmada' | 'cancelada',
    public fecha_reserva: Date,
    public usuario: number, // id_usuario
    public turno: number,   // id_turno
    public cancha: number,  // id_cancha
  ) {}
}
