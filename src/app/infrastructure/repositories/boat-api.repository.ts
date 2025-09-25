import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { EmbarcacionRepository } from 'src/app/domain/repositories/boat.repository';
import { 
  EmbarcacionCreateDto, 
  EmbarcacionUpdateDto, 
  EmbarcacionReadDto, 
  EmbarcacionDetalleDto 
} from 'src/app/application/dto/boat.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class EmbarcacionApiRepository implements EmbarcacionRepository {
  private url = endpoints.boats;  // 👈 define la ruta en endpoints.ts

  constructor(private http: HttpClient) {}

  async create(dto: EmbarcacionCreateDto): Promise<EmbarcacionReadDto> {
    return await firstValueFrom(
      this.http.post<EmbarcacionReadDto>(this.url, dto)
    );
  }

  async update(id: string, dto: EmbarcacionUpdateDto): Promise<EmbarcacionReadDto> {
    return await firstValueFrom(
      this.http.put<EmbarcacionReadDto>(`${this.url}/${id}`, dto)
    );
  }

  async getById(id: string): Promise<EmbarcacionReadDto | null> {
    return await firstValueFrom(
      this.http.get<EmbarcacionReadDto>(`${this.url}/${id}`)
    );
  }

  async getAll(): Promise<EmbarcacionReadDto[]> {
    return await firstValueFrom(
      this.http.get<EmbarcacionReadDto[]>(this.url)
    );
  }

  async getAllDetalle(): Promise<EmbarcacionDetalleDto[]> {
    return await firstValueFrom(
      this.http.get<EmbarcacionDetalleDto[]>(`${this.url}`)
    );
  }

  //listar embarcaciones por generador
  async getByGenerador(): Promise<EmbarcacionDetalleDto[]> {
    return await firstValueFrom(
      this.http.get<EmbarcacionDetalleDto[]>(`${this.url}/generador`)
    );
  }
}
