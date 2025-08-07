import { Injectable } from '@angular/core';
import { RegistroResiduoRepository } from 'src/app/domain/repositories/waste.repository';
import { RegistroResiduo } from 'src/app/domain/entities/waste.entity';
import { RegistroResiduoMapper } from 'src/app/application/mappers/waste.mapper';

@Injectable({ providedIn: 'root' })
export class CreateRegistroResiduoUseCase {
  constructor(private readonly repository: RegistroResiduoRepository) {}

  async execute(registro: RegistroResiduo): Promise<RegistroResiduo> {
    const dto = RegistroResiduoMapper.toCreateDto(registro);
    const createdDto = await this.repository.create(dto);
    return RegistroResiduoMapper.fromReadDto(createdDto);
  }
}