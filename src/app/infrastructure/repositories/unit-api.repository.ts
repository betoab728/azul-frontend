//implementacion de la interfaz UnitRepository para interactuar con la API de unidades de medida
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UnitRepository } from 'src/app/domain/repositories/unit.repository';
import { CreateUnitDto, UpdateUnitDto, UnitReadDto } from 'src/app/application/dto/unit.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class UnitApiRepository implements UnitRepository {
  private url = endpoints.units; // URL del endpoint de unidades

  constructor(private http: HttpClient) {}

  async create(dto: CreateUnitDto): Promise<UnitReadDto> {
    return await firstValueFrom(this.http.post<UnitReadDto>(this.url, dto));
  }

  async update(id: number, dto: UpdateUnitDto): Promise<UnitReadDto> {
    return await firstValueFrom(this.http.put<UnitReadDto>(`${this.url}/${id}`, dto));
  }

  async delete(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.url}/${id}`));
  }

  async getById(id: number): Promise<UnitReadDto | null> {
    return await firstValueFrom(this.http.get<UnitReadDto>(`${this.url}/${id}`));
  }

  async getAll(): Promise<UnitReadDto[]> {
    return await firstValueFrom(this.http.get<UnitReadDto[]>(this.url));
  }
}

