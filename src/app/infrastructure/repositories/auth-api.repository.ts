//implementacion de la interfaz AuthRepository
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from 'src/app/domain/repositories/auth.repository';
import { LoginRequestDto } from 'src/app/application/dto/login-request.dto';
import { LoginResponseDto } from 'src/app/application/dto/user.dto';
import { endpoints } from '../config/endpoints';
import { firstValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class AuthApiRepository implements AuthRepository {

    private url = endpoints.login;

    constructor(private http: HttpClient) {}

   async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    console.log('url login...', this.url);

    return await firstValueFrom(
      this.http.post<LoginResponseDto>(this.url, dto)
    );

    }   
  }



