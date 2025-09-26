//entidad usuario: id, nombre, email, password, created_at, updated_at, roles
export interface User {
    id?: string; // opcional si es nuevo
    nombre: string;
    correo: string;
    clave: string; // encriptada
    idRol: string; // referencia al rol
    idGenerador: string; // referencia al generador
    estado?: number; // '0' para inactivo, '1' para activo
    created_at?: string; // opcional, si es nuevo no se envía
    updated_at?: string; // opcional, si es nuevo no se envía
}

export interface UserWithRole {
  id: string;
  nombre: string;
  correo: string;
  nombreRol: string;
  estado?: number;
  created_at?: string;
}