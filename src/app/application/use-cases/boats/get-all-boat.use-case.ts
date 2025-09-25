import { Injectable } from '@angular/core';
import { EmbarcacionRepository } from 'src/app/domain/repositories/boat.repository';
import { EmbarcacionDetalle } from 'src/app/domain/entities/boat.entity';
import { EmbarcacionMapper } from 'src/app/application/mappers/boat.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllEmbarcacionesUseCase {
  constructor(private readonly repository: EmbarcacionRepository) {}

  async execute(): Promise<EmbarcacionDetalle[]> {
    const dtos = await this.repository.getAllDetalle();
    return EmbarcacionMapper.fromDetalleDtoList(dtos);
  }
}
