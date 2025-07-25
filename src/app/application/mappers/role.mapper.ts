import { RoleReadDto,CreateRoleDto,UpdateRoleDto } from 'src/app/application/dto/role.dto';
import { Role } from 'src/app/domain/entities/role.entity';

export class RoleMapper {

  static fromReadDto(dto: RoleReadDto): Role {
    return {
      id: dto.id,
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      created_at: dto.created_at,
      updated_at: dto.updated_at
    };
  }

  static toCreateDto(entity: Role): CreateRoleDto {
    return {
      nombre: entity.nombre,
      descripcion: entity.descripcion
    };
  }
  
  static toUpdateDto(entity: Role): UpdateRoleDto {
    return {
      nombre: entity.nombre,
      descripcion: entity.descripcion
    };
  }
    static fromReadDtoList(dtos: RoleReadDto[]): Role[] {
        return dtos.map(this.fromReadDto);
      }

  }