//interfaz para el repositorio de unidades de medida

import { CreateUnitDto, UpdateUnitDto, UnitReadDto } from 'src/app/application/dto/unit.dto';

export abstract class UnitRepository {
    abstract create(dto: CreateUnitDto): Promise<UnitReadDto>; // crea una nueva unidad y retorna el dto de la unidad creada
    abstract update(id: number, dto: UpdateUnitDto): Promise<UnitReadDto>; // actualiza una unidad existente y retorna el dto actualizado
    abstract delete(id: number): Promise<void>; // elimina una unidad por su id
    abstract getById(id: number): Promise<UnitReadDto | null>; // obtiene una unidad por su id, puede ser null si no existe
    abstract getAll(): Promise<UnitReadDto[]>; // obtiene todas las unidades
}