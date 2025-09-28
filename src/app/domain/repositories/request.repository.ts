import {
    CreateSolicitudDto,
    SolicitudCotizacionReadDto,
    SolicitudCotizacionListDto,
  } from 'src/app/application/dto/request.dto';
  
  export abstract class SolicitudCotizacionRepository {
    // Crear una nueva solicitud con sus detalles
    abstract create(dto: CreateSolicitudDto): Promise<SolicitudCotizacionReadDto>;
  
    // Obtener todas las solicitudes (listado general)
    abstract getAll(): Promise<SolicitudCotizacionListDto[]>;
  
    // Obtener solicitudes filtradas por embarcación
    abstract getByEmbarcacion(idEmbarcacion: string): Promise<SolicitudCotizacionListDto[]>;
  
    // Obtener solicitudes filtradas por generador
    abstract getByGenerador(idGenerador: string): Promise<SolicitudCotizacionListDto[]>;
  
    // Obtener solicitudes filtradas por puerto
    abstract getByPuerto(idPuerto: string): Promise<SolicitudCotizacionListDto[]>;
  
    // Actualizar el estado de una solicitud
    abstract updateEstado(idSolicitud: string, idEstado: string): Promise<SolicitudCotizacionReadDto>;
  }
  