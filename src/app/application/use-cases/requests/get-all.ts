import { Injectable } from '@angular/core';
import { SolicitudCotizacionRepository } from 'src/app/domain/repositories/request.repository';
import { SolicitudCotizacionList } from 'src/app/domain/entities/request.entity';
import { SolicitudCotizacionMapper } from 'src/app/application/mappers/request.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllSolicitudesUseCase {
  constructor(private readonly repository: SolicitudCotizacionRepository) {}

  async execute(): Promise<SolicitudCotizacionList[]> {
    // Paso 1: pedir al repositorio los DTOs de lista
    const dtos = await this.repository.getAll();

    // Paso 2: mapear cada DTO a Entidad de dominio
    return dtos.map(SolicitudCotizacionMapper.fromReadDtoList);
  }
}
