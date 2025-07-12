import { Injectable } from '@angular/core';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserWithRole } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class GetAllUsersWithRoleUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserWithRole[]> {
    const dtoList = await this.userRepository.getAllWithRoles();
    console.log('DTOs obtenidos:', dtoList);
    return UserMapper.fromWithRoleDtoList(dtoList);
  }
}