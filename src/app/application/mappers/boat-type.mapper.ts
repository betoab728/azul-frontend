// src/app/application/mappers/tipo-embarcacion.mapper.ts
import { 
    TipoEmbarcacionCreateDto, 
    TipoEmbarcacionUpdateDto, 
    TipoEmbarcacionReadDto 
  } from 'src/app/application/dto/boat-type.dto';
  
  import { TipoEmbarcacion } from 'src/app/domain/entities/boat-type.entity.js';
  
  export class TipoEmbarcacionMapper {
  
    // Entidad → DTO para crear
    static toCreateDto(entity: TipoEmbarcacion): TipoEmbarcacionCreateDto {
      return {
        nombre: entity.nombre ?? '',
        descripcion: entity.descripcion ?? ''
      };
    }
  
    // Entidad → DTO para actualizar
    static toUpdateDto(entity: TipoEmbarcacion): TipoEmbarcacionUpdateDto {
      return {
        nombre: entity.nombre,
        descripcion: entity.descripcion
      };
    }
  
    // DTO de lectura → Entidad
    static fromReadDto(dto: TipoEmbarcacionReadDto): TipoEmbarcacion {
      return {
        id: dto.id,
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        created_at: dto.created_at,
        updated_at: dto.updated_at
      };
    }
  
    static fromReadDtoList(dtos: TipoEmbarcacionReadDto[]): TipoEmbarcacion[] {
      return dtos.map(this.fromReadDto);
    }
  }
  