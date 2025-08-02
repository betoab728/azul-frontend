import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/domain/repositories/user.repository';
import { UserWithRole } from 'src/app/domain/entities/user.entity';
import { UserMapper } from 'src/app/application/mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllUsersWithRoleUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithRole[]> {
    const dtoList = await this.userRepository.getAllWithRoles();
    console.log('DTOs obtenidos:', dtoList);
    return UserMapper.fromWithRoleDtoList(dtoList);
  }
}