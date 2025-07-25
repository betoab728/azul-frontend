//caso de uso para crear una unidad de medida
import { Injectable } from '@angular/core';
import { UnitRepository } from 'src/app/domain/repositories/unit.repository';
import { Unit } from 'src/app/domain/entities/unit.entity';
import { UnitMapper } from 'src/app/application/mappers/unit.mapper';

@Injectable({ providedIn: 'root' })

export class CreateUnitUseCase {
    constructor(private readonly unitRepository: UnitRepository) {}

    async execute(unit: Unit): Promise<Unit> { // Promise retorna una promesa de un modelo de dominio Unit
        const dto = UnitMapper.toCreateDto(unit); // la ui envia un modelo de dominio Unit, el mapper lo convierte a un dto de creacion para la api
        const createdDto = await this.unitRepository.create(dto); // llama al repositorio para crear la unidad, pasando el dto de creacion
        return UnitMapper.fromReadDto(createdDto); // convierte el dto de respuesta de la api a un modelo de dominio Unit y lo retorna
    }
}