

import { Injectable } from '@angular/core';
import { AuthRepository } from 'src/app/domain/repositories/auth.repository';
import { LoginRequestDto } from 'src/app/application/dto/login-request.dto';

import { LoginResponseDto } from 'src/app/application/dto/user.dto';


@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  execute(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authRepo.login(dto);
  }
}