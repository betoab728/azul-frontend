import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RegistroResiduoRepository } from 'src/app/domain/repositories/waste.repository';
import {
  CreateRegistroResiduoDto,
  RegistroResiduoReadDto,
  UpdateRegistroResiduoDto,
  RegistroResiduoDetalleDto
} from 'src/app/application/dto/waste.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
@Injectable()
export class RegistroResiduoApiRepository implements RegistroResiduoRepository {
  private url = endpoints.waste; 
  constructor(private http: HttpClient) {}

  async create(dto: CreateRegistroResiduoDto): Promise<RegistroResiduoReadDto> {
    return await firstValueFrom(this.http.post<RegistroResiduoReadDto>(this.url, dto));
  }

  async update(id: string, dto: UpdateRegistroResiduoDto): Promise<RegistroResiduoReadDto> {
    return await firstValueFrom(this.http.put<RegistroResiduoReadDto>(`${this.url}/${id}`, dto));
  }

  async getById(id: string): Promise<RegistroResiduoReadDto | null> {
    return await firstValueFrom(this.http.get<RegistroResiduoReadDto>(`${this.url}/${id}`));
  }

  async getAll(): Promise<RegistroResiduoReadDto[]> {
    return await firstValueFrom(this.http.get<RegistroResiduoReadDto[]>(this.url));
  }

  async getAllDetalle(): Promise<RegistroResiduoDetalleDto[]> {
    return await firstValueFrom(this.http.get<RegistroResiduoDetalleDto[]>(`${this.url}`));
  }
}