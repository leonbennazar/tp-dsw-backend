//repository hace referencia al acceso a la base de datos
export interface Repository<T> {
  findAll(): Promise <T[] | undefined>
  findOne(item: { id: number, capacidad_x_equipo: number }): Promise<T | undefined>
  add(item: T): Promise<T | undefined>
  update(id: number, item: T): Promise<T | undefined>
  delete(item:{id: number,capacidad_x_equipo: number}): Promise<T | undefined>
}
