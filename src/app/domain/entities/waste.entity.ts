
export interface RegistroResiduo {
    id?: string;
    nombreResiduo: string;
    idTipoResiduo: string;
    idUnidad: string;
    observaciones?: string;
    createdAt?: string;
    updatedAt?: string;
    estado?: string;
  }
  
  export interface RegistroResiduoDetalle {
    id: string;
    nombreResiduo: string;
    tipoResiduo: string;
    clasificacion: string;
    unidadMedida: string;
    observaciones?: string;
    createdAt?: string;
    estado: string;
  }
  