
// DTO para crear un nuevo registro de residuo
export interface CreateRegistroResiduoDto {
    nombre_residuo: string;
    id_tipo_residuo: string;
    id_unidad: string;
    observaciones?: string;
  }

  export interface UpdateRegistroResiduoDto {
    nombre_residuo?: string;
    id_tipo_residuo?: string;
    id_unidad?: string;
    observaciones?: string;
  }

// DTO para lo que retorna el backend cuando se crea el residuo
export interface RegistroResiduoReadDto {
    id: string;
    nombre_residuo: string;
    id_tipo_residuo: string;
    id_unidad: string;
    observaciones?: string;
    created_at: string;
    updated_at: string;
    estado: 'Activo' | 'Inactivo'; // El backend ya convierte esto a string
  }


// DTO para el listado detallado de residuos (con joins)
export interface RegistroResiduoDetalleDto {
    id: string;
    nombre_residuo: string;
    tipo_residuo: string;
    clasificacion: string;
    unidad_medida: string;
    observaciones?: string;
    created_at: string;
    estado: 'Activo' | 'Inactivo';
  }