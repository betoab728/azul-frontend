//mapper para transformar datos de usuario
import { User,UserWithRole  } from 'src/app/domain/entities/user.entity';
import { CreateUserDto, UpdateUserDto, UserReadDto, UserWithRoleDto } from 'src/app/application/dto/user.dto';

export class UserMapper {

    static toCreateDto(user: User): CreateUserDto {
    return {
      nombre: user.nombre,
      correo: user.correo,
      clave: user.clave,
      id_rol: user.idRol,
    };
  }

  // 📤 Dominio → DTO de actualización
  static toUpdateDto(user: User): UpdateUserDto {
    return {
      nombre: user.nombre,
      correo: user.correo,
      clave: user.clave,
      id_rol: user.idRol,
      estado: user.estado,
    };
  }

  // 📥 DTO de lectura → Dominio
  static fromReadDto(dto: UserReadDto): User {
    return {
      id: dto.id,
      nombre: dto.nombre,
      correo: dto.correo,
      clave: '', // No viene en el dto de lectura
      idRol: dto.id_rol,
      estado:  dto.estado ,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    };
    
  }

  static fromReadDtoList(dtos: UserReadDto[]): User[] {
    return dtos.map(this.fromReadDto);
  }

  // 📥 DTO con rol → Entidad UserWithRole
  static fromWithRoleDto(dto: UserWithRoleDto): UserWithRole {
    return {
      id: dto.id,
      nombre: dto.nombre,
      correo: dto.correo,
      nombreRol: dto.nombre_rol,
      estado:  dto.estado ,
      created_at: dto.created_at,
    };
  }

  static fromWithRoleDtoList(dtos: UserWithRoleDto[]): UserWithRole[] {
    return dtos.map(this.fromWithRoleDto);
  }
}
