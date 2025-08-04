export interface CreateTipoResiduoDto {
    nombre: string;
    descripcion?: string;
    id_clasificacion: string;
  }

  export interface UpdateTipoResiduoDto {
    nombre?: string;
    descripcion?: string;
    id_clasificacion?: string;
  }

  export interface TipoResiduoReadDto {
    id: string;
    nombre: string;
    descripcion?: string;
    id_clasificacion: string;
    created_at: string;
    updated_at: string;
    estado : string; 
  }

  export interface TipoResiduoWithClasificacionDto {
    id: string;
    nombre: string;
    descripcion?: string;
    clasificacion: string; // nombre de la clasificación
    created_at: string;
    estado: string;
  }