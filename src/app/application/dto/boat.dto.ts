// models/embarcacion.dto.ts

// Crear embarcación
export interface EmbarcacionCreateDto {
    nombre: string;
    matricula: string;
    id_tipo_embarcacion: string;   // UUID
    capacidad_carga?: number;
    capitan?: string;
    observaciones?: string;
    id_generador: string;          // UUID
  }
  
  // Actualizar embarcación
  export interface EmbarcacionUpdateDto {
    nombre?: string;
    matricula?: string;
    id_tipo_embarcacion?: string;  // UUID
    capacidad_carga?: number;
    capitan?: string;
    observaciones?: string;
    estado?: number;               // 1 = Activo, 0 = Inactivo
    id_generador?: string;         // UUID
  }
  
  // Lectura básica (cuando el backend devuelve el objeto creado/actualizado)
  export interface EmbarcacionReadDto {
    id: string;
    nombre?: string;
    matricula?: string;
    id_tipo_embarcacion: string;   // UUID
    capacidad_carga?: number;
    capitan?: string;
    estado: string;                // "Activo" | "Inactivo"
    observaciones?: string;
    created_at: string;
    updated_at: string;
    id_generador: string;          // UUID
  }
  
  // Listado con detalles (cuando haces un get detallado con joins)
  export interface EmbarcacionDetalleDto {
    id: string;
    nombre?: string;
    matricula?: string;
    capacidad_carga?: number;
    capitan?: string;
    estado: string;                // "Activo" | "Inactivo"
    observaciones?: string;
    created_at: string;
    updated_at: string;
    generador: string;             // nombre/razón social
    tipo_embarcacion: string;      // nombre del tipo de embarcación
  }
  