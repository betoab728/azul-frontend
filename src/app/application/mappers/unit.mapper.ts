//mapeador de dto de unidad a entidad y viceversa
import { UnitReadDto, CreateUnitDto, UpdateUnitDto } from 'src/app/application/dto/unit.dto';
import { Unit } from 'src/app/domain/entities/unit.entity';

export class UnitMapper {

  static fromReadDto(dto: UnitReadDto): Unit {
    return {
      id: dto.id,
      codigo: dto.codigo,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      created_at: dto.created_at,
      updated_at: dto.updated_at
    };
  }

  static toCreateDto(entity: Unit): CreateUnitDto {
    return {
      codigo: entity.codigo,
      nombre: entity.nombre,
      descripcion: entity.descripcion
    };
  }

  static toUpdateDto(entity: Unit): UpdateUnitDto {
    return {
      codigo: entity.codigo,
      nombre: entity.nombre,
      descripcion: entity.descripcion
    };
  }

  static fromReadDtoList(dtos: UnitReadDto[]): Unit[] {
    return dtos.map(this.fromReadDto);
  }
}