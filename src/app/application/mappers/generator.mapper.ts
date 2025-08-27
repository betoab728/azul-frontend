import { 
    GeneradorResiduoCreateDto, 
    GeneradorResiduoUpdateDto, 
    GeneradorResiduoReadDto, 
    GeneradorResiduoDetalleDto 
  } from 'src/app/application/dto/generator.dto';
  
  import { 
    GeneradorResiduo, 
    GeneradorResiduoDetalle 
  } from 'src/app/domain/entities/generator.entity';
  
  export class GeneradorResiduoMapper {
  
    // Entidad → DTO para crear
    static toCreateDto(entity: GeneradorResiduo): GeneradorResiduoCreateDto {
      return {
        ruc: entity.ruc,
        razon_social: entity.razonsocial,
        direccion: entity.direccion,
        id_distrito: Number(entity.idDistrito),
        dni_responsable: entity.dniResponsable,
        nombre_responsable: entity.nombreResponsable,
        telefono: entity.telefono,
        correo: entity.correo,
        latitud: entity.latitud,
        longitud: entity.longitud
      };
    }
  
    // Entidad → DTO para actualizar
    static toUpdateDto(entity: GeneradorResiduo): GeneradorResiduoUpdateDto {
      return {
        ruc: entity.ruc,
        razon_social: entity.razonsocial,
        direccion: entity.direccion,
        id_distrito: entity.idDistrito ? Number(entity.idDistrito) : undefined,
        dni_responsable: entity.dniResponsable,
        nombre_responsable: entity.nombreResponsable,
        telefono: entity.telefono,
        correo: entity.correo,
        estado: entity.estado ? Number(entity.estado) : undefined
      };
    }
  
    // DTO de lectura → Entidad
    static fromReadDto(dto: GeneradorResiduoReadDto): GeneradorResiduo {
      return {
        id: dto.id,
        ruc: dto.ruc,
        razonsocial: dto.razon_social ?? '',
        direccion: dto.direccion,
        idDistrito: dto.id_distrito.toString(),
        dniResponsable: dto.dni_responsable,
        nombreResponsable: dto.nombre_responsable,
        telefono: dto.telefono,
        correo: dto.correo,
        created_at: dto.created_at,
        updated_at: dto.updated_at,
        estado: dto.estado.toString()
      };
    }
  
    static fromReadDtoList(dtos: GeneradorResiduoReadDto[]): GeneradorResiduo[] {
      return dtos.map(this.fromReadDto);
    }
  
    // DTO detalle → Entidad detalle
    static fromDetalleDto(dto: GeneradorResiduoDetalleDto): GeneradorResiduoDetalle {
      return {
        id: dto.id,
        ruc: dto.ruc,
        razonsocial: dto.razon_social ?? '',
        direccion: dto.direccion,
        distrito: dto.distrito,
        dniResponsable: dto.dni_responsable,
        nombreResponsable: dto.nombre_responsable,
        telefono: dto.telefono,
        correo: dto.correo,
        created_at: dto.created_at,
        estado: dto.estado
      };
    }
  
    static fromDetalleDtoList(dtos: GeneradorResiduoDetalleDto[]): GeneradorResiduoDetalle[] {
      return dtos.map(this.fromDetalleDto);
    }
  }
  