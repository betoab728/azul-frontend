import { Injectable } from '@angular/core';
import { RoleRepository } from '../../../domain/repositories/role.repository';
import { Role } from '../../../domain/entities/role.entity';
import { RoleMapper } from '../../mappers/role.mapper';

@Injectable({ providedIn: 'root' })

export class GetAllRolesUseCase {
    constructor(private readonly roleRepository: RoleRepository) {}
  
    async execute(): Promise<Role[]> {
      const dtoList = await this.roleRepository.getAll();
      return RoleMapper.fromReadDtoList(dtoList);
    }
  }