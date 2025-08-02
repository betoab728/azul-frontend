import { Injectable } from '@angular/core';
import { TipoResiduoRepository } from 'src/app/domain/repositories/type.repository';
import { TipoResiduoWithClasificacion } from 'src/app/domain/entities/types.entity';
import { TipoResiduoMapper } from 'src/app/application/mappers/type.mapper';


@Injectable({ providedIn: 'root' })
export class GetAllTiposWithClasificacionUseCase {
  constructor(private readonly tipoResiduoRepository: TipoResiduoRepository) {}

  async execute(): Promise<TipoResiduoWithClasificacion[]> {
    const dtoList = await this.tipoResiduoRepository.getAllWithClasificacion();
    return TipoResiduoMapper.fromWithClasificacionDtoList(dtoList);
  }
}