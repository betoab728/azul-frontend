

import { Injectable } from '@angular/core';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginRequestDto } from '../dto/login-request.dto';

import { LoginResponseDto } from '../dto/login-response.dto';


@Injectable({ providedIn: 'root' })
export class LoginUseCase {
  constructor(private readonly authRepo: AuthRepository) {}

  execute(dto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authRepo.login(dto);
  }
}