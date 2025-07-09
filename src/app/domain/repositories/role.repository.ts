//interfaz para el repositorio de roles
import { CreateRoleDto,UpdateRoleDto, RoleReadDto } from '../../application/dto/role.dto';

export abstract class RoleRepository {
    abstract create(dto: CreateRoleDto): Promise<RoleReadDto>;
    abstract update(id: number, dto: UpdateRoleDto): Promise<RoleReadDto>;
    abstract delete(id: number): Promise<void>;
    abstract getById(id: number): Promise<RoleReadDto | null>;
    abstract getAll(): Promise<RoleReadDto[]>;
  }