// src/app/domain/dtos/tipo-embarcacion.dto.ts

// Crear
export interface TipoEmbarcacionCreateDto {
    nombre: string;
    descripcion?: string;
  }
  
  // Actualizar
  export interface TipoEmbarcacionUpdateDto {
    nombre?: string;
    descripcion?: string;
  }
  
  // Lectura (respuesta del backend)
  export interface TipoEmbarcacionReadDto {
    id: string;
    nombre: string;
    descripcion?: string;
    created_at: string;
    updated_at: string;
  }
  