import { Injectable } from '@angular/core';
import { RoleRepository } from 'src/app/domain/repositories/role.repository';
import { Role } from 'src/app/domain/entities/role.entity';
import { RoleMapper } from 'src/app/application/mappers/role.mapper';

@Injectable({ providedIn: 'root' })

export class GetAllRolesUseCase {
    constructor(private readonly roleRepository: RoleRepository) {}
  
    async execute(): Promise<Role[]> {
      const dtoList = await this.roleRepository.getAll();
      return RoleMapper.fromReadDtoList(dtoList);
    }
  }