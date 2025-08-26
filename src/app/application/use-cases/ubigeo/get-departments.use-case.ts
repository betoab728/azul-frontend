import { Injectable } from '@angular/core';
import { UbigeoRepository } from 'src/app/domain/repositories/ubigeo.repository';
import { Departamento } from 'src/app/domain/entities/ubigeo.entity';
import { UbigeoMapper } from 'src/app/application/mappers/ubigeo.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllDepartamentosUseCase {
  constructor(private readonly repository: UbigeoRepository) {}

  async execute(): Promise<Departamento[]> {
    const dtos = await this.repository.getDepartamentos();
    return UbigeoMapper.fromDepartamentoDtoList(dtos);
  }
}