import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/domain/repositories/user.repository';
import { User } from 'src/app/domain/entities/user.entity';
import { UserMapper } from 'src/app/application/mappers/user.mapper';

@Injectable({ providedIn: 'root' })
export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    const dto = UserMapper.toCreateDto(user);
    const createdDto = await this.userRepository.create(dto);
    return UserMapper.fromReadDto(createdDto);
  }
}