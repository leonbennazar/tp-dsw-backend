
export class Reserva {
  private static asigID: number = 1
  constructor(
    public estado_reserva: 'pendiente' | 'confirmada' | 'cancelada',
    public fecha_reserva: Date,
    public turno: number,   // id_turno
    public cancha: number,  // id_cancha
    public id = Reserva.asigID++,
  ) {}
}
