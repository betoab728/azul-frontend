import { Injectable } from '@angular/core';
import { RegistroResiduoRepository } from 'src/app/domain/repositories/waste.repository';
import { RegistroResiduoDetalle } from 'src/app/domain/entities/waste.entity';
import { RegistroResiduoMapper } from 'src/app/application/mappers/waste.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllRegistroResiduosDetalleUseCase {
  constructor(private readonly repository: RegistroResiduoRepository) {}

  async execute(): Promise<RegistroResiduoDetalle[]> {
    const dtos = await this.repository.getAllDetalle();
    return RegistroResiduoMapper.fromDetalleDtoList(dtos);
  }
}