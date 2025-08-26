import { Injectable } from '@angular/core';
import { UbigeoRepository } from 'src/app/domain/repositories/ubigeo.repository';
import { Distrito } from 'src/app/domain/entities/ubigeo.entity';
import { UbigeoMapper } from 'src/app/application/mappers/ubigeo.mapper';

@Injectable({ providedIn: 'root' })
export class GetDistritosByProvinciaUseCase {
  constructor(private readonly repository: UbigeoRepository) {}

  async execute(idProvincia: number): Promise<Distrito[]> {
    const dtos = await this.repository.getDistritos(idProvincia);
    return UbigeoMapper.fromDistritoDtoList(dtos, idProvincia);
  }
}
