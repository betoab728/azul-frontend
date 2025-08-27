// app/application/dto/generador-residuo.dto.ts
export interface GeneradorResiduoCreateDto {
    ruc: string;
    razon_social?: string;
    direccion?: string;
    id_distrito: number;
    dni_responsable?: string;
    nombre_responsable?: string;
    telefono?: string;
    correo?: string;
    //latitud y longitud opcionales
    latitud?: number;
    longitud?: number;
  }

  //update 
  export interface GeneradorResiduoUpdateDto {
    ruc?: string;
    razon_social?: string;
    direccion?: string;
    id_distrito?: number;
    dni_responsable?: string;
    nombre_responsable?: string;
    telefono?: string;
    correo?: string;
    estado?: number; // 1: activo, 0: inactivo
  }
  
  export interface GeneradorResiduoReadDto {
    id: string;
    ruc: string;
    razon_social?: string;
    direccion?: string;
    id_distrito: number;
    dni_responsable?: string;
    nombre_responsable?: string;
    telefono?: string;
    correo?: string;
    created_at: string;
    updated_at: string;
    estado: number;
  }
  
  export interface GeneradorResiduoDetalleDto {
    id: string;
    ruc: string;
    razon_social?: string;
    direccion?: string;
    distrito: string; // nombre del distrito
    dni_responsable?: string;
    nombre_responsable?: string;
    telefono?: string;
    correo?: string;
    created_at: string;
    estado: string; // "Activo" | "Inactivo"
  }
  