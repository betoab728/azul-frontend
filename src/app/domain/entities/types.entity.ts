export interface TipoResiduo {
    id?: string;
    nombre: string;
    descripcion?: string;
    id_clasificacion: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface TipoResiduoWithClasificacion {
    id: string;
    nombre: string;
    descripcion?: string;
    clasificacion: string; // Nombre de la clasificación
    created_at?: string;
  }