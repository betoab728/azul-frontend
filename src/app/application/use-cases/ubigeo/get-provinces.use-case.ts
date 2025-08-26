import { Injectable } from '@angular/core';
import { UbigeoRepository } from 'src/app/domain/repositories/ubigeo.repository';
import { Provincia } from 'src/app/domain/entities/ubigeo.entity';
import { UbigeoMapper } from 'src/app/application/mappers/ubigeo.mapper';

@Injectable({ providedIn: 'root' })
export class GetProvinciasByDepartamentoUseCase {
  constructor(private readonly repository: UbigeoRepository) {}

  async execute(idDepartamento: number): Promise<Provincia[]> {
    const dtos = await this.repository.getProvincias(idDepartamento);
    return UbigeoMapper.fromProvinciaDtoList(dtos, idDepartamento);
  }
}
