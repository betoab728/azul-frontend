import { Injectable } from '@angular/core';
import { SolicitudCotizacionRepository } from 'src/app/domain/repositories/request.repository';
import { SolicitudCotizacion } from 'src/app/domain/entities/request.entity';
import { DetalleSolicitud } from 'src/app/domain/entities/request.entity';
import { SolicitudCotizacionMapper } from 'src/app/application/mappers/request.mapper';

@Injectable({ providedIn: 'root' })
export class CreateSolicitudCotizacionUseCase {
  constructor(private readonly repository: SolicitudCotizacionRepository) {}

  async execute(solicitud: SolicitudCotizacion, detalles:DetalleSolicitud[]): Promise<SolicitudCotizacion> {
    // Paso 1: convertir la entidad de dominio a DTO de creación
    const dto = SolicitudCotizacionMapper.toCreateSolicitudDto(solicitud, detalles );

    // Paso 2: llamar al repositorio para guardar en el backend
    const createdDto = await this.repository.create(dto);

    // Paso 3: mapear de DTO de lectura a Entidad de dominio
    return SolicitudCotizacionMapper.fromReadDto(createdDto);
  }
}
