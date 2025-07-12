//interfaz para el repositorio de usuarios
import { CreateUserDto, UpdateUserDto, UserReadDto, UserWithRoleDto } from '../../application/dto/user.dto';

export abstract class UserRepository {
    abstract create(dto: CreateUserDto): Promise<UserReadDto>;
    abstract update(id: string, dto: UpdateUserDto): Promise<UserReadDto>;
    abstract getById(id: string): Promise<UserReadDto | null>;
    abstract getAll(): Promise<UserReadDto[]>;
    abstract getAllWithRoles(): Promise<UserWithRoleDto[]>;
}