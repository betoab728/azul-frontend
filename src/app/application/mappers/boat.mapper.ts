import { 
    EmbarcacionCreateDto, 
    EmbarcacionUpdateDto, 
    EmbarcacionReadDto, 
    EmbarcacionDetalleDto 
  } from 'src/app/application/dto/boat.dto';
  
  import { 
    Embarcacion, 
    EmbarcacionDetalle 
  } from 'src/app/domain/entities/boat.entity';
  
  export class EmbarcacionMapper {
  
    // Entidad → DTO para crear
    static toCreateDto(entity: Embarcacion): EmbarcacionCreateDto {
      return {
        nombre: entity.nombre ?? '',
        matricula: entity.matricula ?? '',
        id_tipo_embarcacion: entity.id_tipo_embarcacion,
        capacidad_carga: entity.capacidad_carga,
        capitan: entity.capitan,
        observaciones: entity.observaciones,
        id_generador: entity.id_generador
      };
    }
  
    // Entidad → DTO para actualizar
    static toUpdateDto(entity: Embarcacion): EmbarcacionUpdateDto {
      return {
        nombre: entity.nombre,
        matricula: entity.matricula,
        id_tipo_embarcacion: entity.id_tipo_embarcacion,
        capacidad_carga: entity.capacidad_carga,
        capitan: entity.capitan,
        observaciones: entity.observaciones,
        estado: entity.estado,
        id_generador: entity.id_generador
      };
    }
  
    // DTO de lectura → Entidad
    static fromReadDto(dto: EmbarcacionReadDto): Embarcacion {
      return {
        id: dto.id,
        nombre: dto.nombre,
        matricula: dto.matricula,
        id_tipo_embarcacion: dto.id_tipo_embarcacion,
        capacidad_carga: dto.capacidad_carga,
        capitan: dto.capitan,
        observaciones: dto.observaciones,
        estado: dto.estado === 'Activo' ? 1 : 0,   // Convertimos string a number
        created_at: dto.created_at,
        updated_at: dto.updated_at,
        id_generador: dto.id_generador
      };
    }
  
    static fromReadDtoList(dtos: EmbarcacionReadDto[]): Embarcacion[] {
      return dtos.map(this.fromReadDto);
    }
  
    // DTO detalle → Entidad detalle
    static fromDetalleDto(dto: EmbarcacionDetalleDto): EmbarcacionDetalle {
      return {
        id: dto.id,
        nombre: dto.nombre,
        matricula: dto.matricula,
        capacidad_carga: dto.capacidad_carga,
        capitan: dto.capitan,
        estado: dto.estado,   // aquí lo dejamos como string: "Activo"/"Inactivo"
        observaciones: dto.observaciones,
        created_at: dto.created_at,
        updated_at: dto.updated_at,
        generador: dto.generador,
        tipo_embarcacion: dto.tipo_embarcacion
      };
    }
  
    static fromDetalleDtoList(dtos: EmbarcacionDetalleDto[]): EmbarcacionDetalle[] {
      return dtos.map(this.fromDetalleDto);
    }
  }
  