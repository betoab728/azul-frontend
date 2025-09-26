import { Injectable } from '@angular/core';
import { TipoEmbarcacionRepository } from 'src/app/domain/repositories/boat-type.repository';
import { TipoEmbarcacion } from 'src/app/domain/entities/boat-type.entity';
import { TipoEmbarcacionMapper } from 'src/app/application/mappers/boat-type.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllTiposEmbarcacionUseCase {
  constructor(private readonly repository: TipoEmbarcacionRepository) {}

  async execute(): Promise<TipoEmbarcacion[]> {
    const dtos = await this.repository.getAll();
    return TipoEmbarcacionMapper.fromReadDtoList(dtos);
  }
}
