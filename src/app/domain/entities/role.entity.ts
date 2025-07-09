//entidad rol: id, nombre, descripcion, created_at, updated_at

export interface Role {
    id?: number;
    nombre: string;
    descripcion: string;
    created_at?: string;  // opcional
    updated_at?: string;  // opcional
}