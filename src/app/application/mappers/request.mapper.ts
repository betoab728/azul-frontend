import {
    CreateSolicitudDto,
    DetalleSolicitudDto,
    SolicitudCotizacionReadDto,
    SolicitudCotizacionListDto,
  } from 'src/app/application/dto/request.dto';
  import {
    SolicitudCotizacion,
    DetalleSolicitud,
    SolicitudCotizacionList,
  } from 'src/app/domain/entities/request.entity';


  export class SolicitudCotizacionMapper {

     // ------------------ CREAR ------------------
    static toCreateSolicitudDto(
        entity: SolicitudCotizacion, 
        detalles: DetalleSolicitud[]): CreateSolicitudDto {
        return {
        fecha: entity.fecha,
        idPuerto: entity.idPuerto,
        idEstadoSolicitud: entity.idEstadoSolicitud,
        observaciones: entity.observaciones,
        idEmbarcacion: entity.idEmbarcacion,
        detalles: detalles.map(this.toDetalleSolicitudDto),
        };
    }
  
    static toDetalleSolicitudDto(entity: DetalleSolicitud): DetalleSolicitudDto {
        return {
        idResiduo: entity.idResiduo,
        cantidad: entity.cantidad,
        };
    }
  
  // ------------------ RESPUESTA CREAR ------------------
    static  fromReadDto(dto: SolicitudCotizacionReadDto): SolicitudCotizacion {
        return {
        id: dto.id,
        fecha: dto.fecha,
        idPuerto: dto.id_puerto,
        idEstadoSolicitud: dto.id_estado_solicitud,
        observaciones: dto.observaciones,
        idEmbarcacion: dto.id_embarcacion,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
        };
    }
  
    // ------------------ LISTADO ------------------
    static fromReadDtoList (dto: SolicitudCotizacionListDto): SolicitudCotizacionList {
        return {
        id: dto.id,
        fecha: dto.fecha,
        hora: dto.hora,
        observaciones: dto.observaciones,
        puerto: dto.puerto,
        estadoSolicitud: dto.estado_solicitud,
        embarcacion: dto.embarcacion,
        generador: dto.generador,
        };
    }
  }
  
 
  