//repository hace referencia al acceso a la base de datos, aunque vamos a usar un ORM
export interface Repository<T> {
  findAll(): T[] | undefined; //Mas adelante lo manejamos con promesas
  findOne(item: { id: number }): T | undefined;
  add(item: T): T | undefined;
  update(item: T): T | undefined;
  delete(item: { id: number }): T | undefined;
}
