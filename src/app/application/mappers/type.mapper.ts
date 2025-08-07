
import { TipoResiduo, TipoResiduoWithClasificacion } from 'src/app/domain/entities/types.entity';
import {
    CreateTipoResiduoDto,
    UpdateTipoResiduoDto,
    TipoResiduoReadDto,
    TipoResiduoWithClasificacionDto
  } from 'src/app/application/dto/type.dto';

  export class TipoResiduoMapper {

    static toCreateDto(entity: TipoResiduo): CreateTipoResiduoDto {
        return {
          nombre: entity.nombre,
          descripcion: entity.descripcion,
          id_clasificacion: entity.id_clasificacion,
        };
      }

      // Entidad → DTO de actualización
        static toUpdateDto(entity: TipoResiduo): UpdateTipoResiduoDto {
        return {
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        id_clasificacion: entity.id_clasificacion,
        };
    }

    // DTO de lectura → Entidad
    static fromReadDto(dto: TipoResiduoReadDto): TipoResiduo {
        return {
          id: dto.id,
          nombre: dto.nombre,
          descripcion: dto.descripcion,
          id_clasificacion: dto.id_clasificacion,
          created_at: dto.created_at,
          updated_at: dto.updated_at,
          estado: dto.estado, 
        };
      }

      static fromReadDtoList(dtos: TipoResiduoReadDto[]): TipoResiduo[] {
        return dtos.map(this.fromReadDto);
      }
      // DTO con clasificación , no muestra id_clasificacion si no el nombre de la clasificación
  static fromWithClasificacionDto(dto: TipoResiduoWithClasificacionDto): TipoResiduoWithClasificacion {
    return {
      id: dto.id,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      clasificacion : dto.clasificacion, 
      created_at: dto.created_at,
      estado: dto.estado, 
    };
  }

  static fromWithClasificacionDtoList(dtos: TipoResiduoWithClasificacionDto[]): TipoResiduoWithClasificacion [] {
    return dtos.map(this.fromWithClasificacionDto);
  }

  }