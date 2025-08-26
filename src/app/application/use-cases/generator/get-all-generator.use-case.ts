import { Injectable } from '@angular/core';
import { GeneradorResiduoRepository } from 'src/app/domain/repositories/generator.repository';
import { GeneradorResiduoDetalle } from 'src/app/domain/entities/generator.entity.js';
import { GeneradorResiduoMapper } from 'src/app/application/mappers/generator.mapper.js';

@Injectable({ providedIn: 'root' })
export class GetAllGeneradoresResiduosUseCase {
  constructor(private readonly repository: GeneradorResiduoRepository) {}

  async execute(): Promise<GeneradorResiduoDetalle[]> {
    const dtos = await this.repository.getAllDetalle();
    return GeneradorResiduoMapper.fromDetalleDtoList(dtos);
  }
}