import { Injectable } from '@angular/core';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const dto = UserMapper.toCreateDto(user);
    const createdDto = await this.userRepository.create(dto);
    return UserMapper.fromReadDto(createdDto);
  }
}