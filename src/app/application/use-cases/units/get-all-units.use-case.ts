//caso de uso para obtener todas las unidades
import { Injectable } from '@angular/core';
import { UnitRepository } from 'src/app/domain/repositories/unit.repository';
import { Unit } from 'src/app/domain/entities/unit.entity';
import { UnitMapper } from 'src/app/application/mappers/unit.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllUnitsUseCase {
  constructor(private readonly unitRepository: UnitRepository) {}

  async execute(): Promise<Unit[]> {
    const dtoList = await this.unitRepository.getAll();
    return UnitMapper.fromReadDtoList(dtoList);
  }
}