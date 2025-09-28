export interface SolicitudCotizacion {
    id: string;
    fecha: string;
    idPuerto: string;
    idEstadoSolicitud: string;
    observaciones?: string;
    idEmbarcacion?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface DetalleSolicitud {
    idResiduo: string;
    cantidad: number;
    idSolicitud?: string;
  }

  export interface SolicitudCotizacionList {
    id: string;
    fecha: string;
    hora: string;
    observaciones: string;
    puerto: string;
    estadoSolicitud: string; 
    embarcacion: string;
    generador: string;
  }