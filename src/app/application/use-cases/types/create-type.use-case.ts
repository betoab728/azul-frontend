import { Injectable } from '@angular/core';
import { TipoResiduoRepository } from 'src/app/domain/repositories/type.repository';
import { TipoResiduo } from 'src/app/domain/entities/types.entity'
import { TipoResiduoMapper } from 'src/app/application/mappers/type.mapper';


@Injectable({ providedIn: 'root' })
export class CreateTipoResiduoUseCase {
    constructor(private readonly tipoResiduoRepository: TipoResiduoRepository) {}
  
    async execute(tipoResiduo: TipoResiduo): Promise<TipoResiduo> {
      const dto = TipoResiduoMapper.toCreateDto(tipoResiduo);
      const createdDto = await this.tipoResiduoRepository.create(dto);
      return TipoResiduoMapper.fromReadDto(createdDto);
    }
  }