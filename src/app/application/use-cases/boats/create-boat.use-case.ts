import { Injectable } from '@angular/core';
import { EmbarcacionRepository } from 'src/app/domain/repositories/boat.repository';
import { Embarcacion } from 'src/app/domain/entities/boat.entity';
import { EmbarcacionMapper } from 'src/app/application/mappers/boat.mapper';

@Injectable({ providedIn: 'root' })
export class CreateEmbarcacionUseCase {
  constructor(private readonly repository: EmbarcacionRepository) {}

  async execute(embarcacion: Embarcacion): Promise<Embarcacion> {
    // Paso 1: convertir la entidad de dominio a DTO de creación
    const dto = EmbarcacionMapper.toCreateDto(embarcacion);

    // Paso 2: llamar al repositorio para guardar en el backend
    const createdDto = await this.repository.create(dto);

    // Paso 3: mapear de DTO de lectura a Entidad de dominio
    return EmbarcacionMapper.fromReadDto(createdDto);
  }
}
