export interface TipoVehiculoCreate {
    nombre: string;
    descripcion: string;
  }
  
  export interface TipoVehiculoResponse {
    id: string;
    nombre: string;
    descripcion: string;
    created_at: string;
    updated_at: string;
  }