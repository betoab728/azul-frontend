//unidad de medida: id, codigo,nombre,descripcion,created,update

export interface Unit {
    id?: number; // opcional, ya que puede ser undefined al crear una nueva unidad
    codigo: string; // codigo unico de la unidad
    nombre: string; // nombre de la unidad
    descripcion?: string; // descripcion opcional de la unidad
    created_at?: string; // fecha de creacion, opcional
    updated_at?: string; // fecha de actualizacion, opcional
}