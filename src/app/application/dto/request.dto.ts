export interface CreateSolicitudDto {
    fecha: string;
    idPuerto: string;
    idEstadoSolicitud: string;
    observaciones?: string;
    idEmbarcacion?: string;
    detalles: DetalleSolicitudDto[];
  }

export interface DetalleSolicitudDto {
    idResiduo: string;
    cantidad: number;
}

// DTO para lo que retorna el backend
export interface SolicitudCotizacionReadDto {
    id: string;
    fecha: string;
    id_puerto: string;
    id_estado_solicitud: string;
    observaciones?: string;
    id_embarcacion?: string;
    created_at: string;
    updated_at: string;
  }

export interface SolicitudCotizacionListDto {
    id: string;
    fecha: string;
    hora: string;
    observaciones: string;
    puerto: string;
    estado_solicitud: string; // backend usa snake_case
    embarcacion: string;
    generador: string;
    created_at: string;
  }
