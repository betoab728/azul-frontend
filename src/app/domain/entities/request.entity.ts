export interface SolicitudCotizacion {
    id: string;
    fecha: string;
    idPuerto: string;
    idEstadoSolicitud: string;
    observaciones?: string;
    idEmbarcacion?: string;
    direccionRecojo?: string;
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
    created_at: string;
  }

  export interface SolicitudDetalle {
    id_residuo: string;
    cantidad: number;
  }
  
  export interface SolicitudCreate {
    fecha: string;

    id_puerto?: string | null;
    id_estado_solicitud: string;
    observaciones: string;
    id_embarcacion?: string | null;
    direccion_recojo?: string;
    detalles: SolicitudDetalle[];
  }

  export interface SolicitudGeneradorList {
    id: string;
    fecha: string;
    hora: string;
    observaciones: string;
    puerto: string;
    estado_solicitud: string; 
    embarcacion: string;
    generador: string;
  }
  export interface DetalleSolicitudCarrito {
    residuo: string;
    cantidad: number;
    unidad: string;

  }
  export interface ItemCotizacion extends DetalleSolicitudCarrito {
    precio: number;   
    subtotal: number;
  }