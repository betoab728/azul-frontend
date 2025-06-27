//implentacion de la interface de repositorio de clasificacion

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ClassificationRepository } from '../../domain/repositories/classification.repository';
import { Classification } from '../../domain/entities/classification.entity';
import { ClassificationRequestDto } from '../../application/dto/classification-request.dto';
//importar config/endpoint para clasification
import { endpoints } from '../config/endpoints';


@Injectable()
export class ClassificationApiRepository implements ClassificationRepository {
  private url =  endpoints.classifications; // URL del endpoint de clasificación

  constructor(private http: HttpClient) {}

  async getAll(): Promise<Classification[]> {
    return await firstValueFrom(this.http.get<Classification[]>(this.url));
  }

  async create(dto: ClassificationRequestDto): Promise<Classification> {
    return await firstValueFrom(this.http.post<Classification>(this.url, dto));
  }

    async update(id: number,nombre: string ): Promise<Classification> {
        return await firstValueFrom(this.http.put<Classification>(`${this.url}/${id}`, dto));
    }

    async delete(id: string): Promise<void> {
        return await firstValueFrom(this.http.delete<void>(`${this.url}/${id}`));
    }
}