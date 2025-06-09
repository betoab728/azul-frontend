//implementacion de la interfaz AuthRepository
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { LoginRequestDto } from '../../application/dto/login-request.dto';
import { LoginResponseDto } from '../../application/dto/login-response.dto';
import { endpoints } from '../config/endpoints';
import { firstValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })

export class AuthApiRepository implements AuthRepository {

    private url = endpoints.login;
 
    constructor(private http: HttpClient) {}

   async login(dto: LoginRequestDto): Promise<LoginResponseDto> {

    return await firstValueFrom(
      this.http.post<LoginResponseDto>(this.url, dto)
    );

    }   
  }



