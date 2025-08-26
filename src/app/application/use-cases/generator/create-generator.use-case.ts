import { Injectable } from '@angular/core';
import {  GeneradorResiduoRepository } from 'src/app/domain/repositories/generator.repository';
import { GeneradorResiduo } from 'src/app/domain/entities/generator.entity';
import { GeneradorResiduoMapper } from 'src/app/application/mappers/generator.mapper';

@Injectable({ providedIn: 'root' })
export class CreateGeneradorResiduoUseCase {
  constructor(private readonly repository: GeneradorResiduoRepository) {}

  async execute(generador: GeneradorResiduo): Promise<GeneradorResiduo> {
    // Paso 1: convertir la entidad de dominio a DTO de creación
    const dto = GeneradorResiduoMapper.toCreateDto(generador);

    // Paso 2: llamar al repositorio para guardar en el backend
    const createdDto = await this.repository.create(dto);

    // Paso 3: mapear de DTO de lectura a Entidad de dominio
    return GeneradorResiduoMapper.fromReadDto(createdDto);
  }
}
