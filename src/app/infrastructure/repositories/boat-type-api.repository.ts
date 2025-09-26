// src/app/infrastructure/repositories/tipo-embarcacion-api.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TipoEmbarcacionRepository } from 'src/app/domain/repositories/boat-type.repository.js';
import { 
  TipoEmbarcacionCreateDto, 
  TipoEmbarcacionUpdateDto, 
  TipoEmbarcacionReadDto 
} from 'src/app/application/dto/boat-type.dto.js';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class TipoEmbarcacionApiRepository implements TipoEmbarcacionRepository {
  private url = endpoints.boatTypes; 

  constructor(private http: HttpClient) {}

  async create(dto: TipoEmbarcacionCreateDto): Promise<TipoEmbarcacionReadDto> {
    return await firstValueFrom(
      this.http.post<TipoEmbarcacionReadDto>(this.url, dto)
    );
  }

  async update(id: string, dto: TipoEmbarcacionUpdateDto): Promise<TipoEmbarcacionReadDto> {
    return await firstValueFrom(
      this.http.put<TipoEmbarcacionReadDto>(`${this.url}/${id}`, dto)
    );
  }

  async getById(id: string): Promise<TipoEmbarcacionReadDto | null> {
    return await firstValueFrom(
      this.http.get<TipoEmbarcacionReadDto>(`${this.url}/${id}`)
    );
  }

  async getAll(): Promise<TipoEmbarcacionReadDto[]> {
    return await firstValueFrom(
      this.http.get<TipoEmbarcacionReadDto[]>(this.url)
    );
  }
}
