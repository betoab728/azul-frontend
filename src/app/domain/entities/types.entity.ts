export interface TipoResiduo {
    id?: string;
    nombre: string;
    descripcion?: string;
    id_clasificacion: string;
    created_at?: string;
    updated_at?: string;
    estado?: string; // Estado del tipo de residuo (activo, inactivo, etc.)
  }

  export interface TipoResiduoWithClasificacion {
    id: string;
    nombre: string;
    descripcion?: string;
    clasificacion: string; // Nombre de la clasificación
    created_at?: string;
    estado?: string; // Estado del tipo de residuo (activo, inactivo, etc.)
  }