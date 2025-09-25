// models/embarcacion.model.ts

export interface Embarcacion {
    id?: string;
    nombre?: string;
    matricula?: string;
    id_tipo_embarcacion: string;   // UUID → string
    capacidad_carga?: number;
    capitan?: string;
    observaciones?: string;
    estado?: number;               // 1 = Activo, 0 = Inactivo
    created_at?: string;
    updated_at?: string;
    id_generador: string;          // UUID → string
  }
  
  export interface EmbarcacionDetalle {
    id: string;
    nombre?: string;
    matricula?: string;
    capacidad_carga?: number;
    capitan?: string;
    estado?: string;               // "Activo" / "Inactivo"
    observaciones?: string;
    created_at: string;
    updated_at: string;
    generador: string;             // nombre/razón social
    tipo_embarcacion: string;      // nombre del tipo de embarcación
  }
  