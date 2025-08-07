import {
    CreateRegistroResiduoDto,
    UpdateRegistroResiduoDto,
    RegistroResiduoReadDto,
    RegistroResiduoDetalleDto
  } from 'src/app/application/dto/waste.dto';
  
  import {
    RegistroResiduo,
    RegistroResiduoDetalle
  } from 'src/app/domain/entities/waste.entity';
  
  export class RegistroResiduoMapper {
  
    // Entidad → DTO para crear
    static toCreateDto(entity: RegistroResiduo): CreateRegistroResiduoDto {
      return {
        nombre_residuo: entity.nombreResiduo,
        id_tipo_residuo: entity.idTipoResiduo,
        id_unidad: entity.idUnidad,
        observaciones: entity.observaciones
      };
    }
  
    // Entidad → DTO para actualizar
    static toUpdateDto(entity: RegistroResiduo): UpdateRegistroResiduoDto {
      return {
        nombre_residuo: entity.nombreResiduo,
        id_tipo_residuo: entity.idTipoResiduo,
        id_unidad: entity.idUnidad,
        observaciones: entity.observaciones
      };
    }
  
    // DTO de lectura → Entidad
    static fromReadDto(dto: RegistroResiduoReadDto): RegistroResiduo {
      return {
        id: dto.id,
        nombreResiduo: dto.nombre_residuo,
        idTipoResiduo: dto.id_tipo_residuo,
        idUnidad: dto.id_unidad,
        observaciones: dto.observaciones,
        createdAt: dto.created_at,
        updatedAt: dto.updated_at,
        estado: dto.estado
      };
    }
  
    static fromReadDtoList(dtos: RegistroResiduoReadDto[]): RegistroResiduo[] {
      return dtos.map(this.fromReadDto);
    }
  
    // DTO detalle → Entidad detalle
    static fromDetalleDto(dto: RegistroResiduoDetalleDto): RegistroResiduoDetalle {
      return {
        id: dto.id,
        nombreResiduo: dto.nombre_residuo,
        tipoResiduo: dto.tipo_residuo,
        clasificacion: dto.clasificacion,
        unidadMedida: dto.unidad_medida,
        observaciones: dto.observaciones,
        createdAt: dto.created_at,
        estado: dto.estado
      };
    }
  
    static fromDetalleDtoList(dtos: RegistroResiduoDetalleDto[]): RegistroResiduoDetalle[] {
      return dtos.map(this.fromDetalleDto);
    }
  }
  