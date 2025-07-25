//dto para unidad de medida

export interface CreateUnitDto {
    codigo: string; // codigo unico de la unidad
    nombre: string; // nombre de la unidad
    descripcion?: string; // descripcion opcional de la unidad
}

export interface UpdateUnitDto {
    codigo?: string; // codigo unico de la unidad
    nombre?: string; // nombre de la unidad
    descripcion?: string; // descripcion opcional de la unidad
    estado?: number; // '0' para inactivo, '1' para activo
}

export interface UnitReadDto {
    id: number; // id de la unidad
    codigo: string; // codigo unico de la unidad
    nombre: string; // nombre de la unidad
    descripcion?: string; // descripcion opcional de la unidad
    estado: number; // '0' para inactivo, '1' para activo
    created_at?: string; // fecha de creacion, opcional
    updated_at?: string; // fecha de actualizacion, opcional
}