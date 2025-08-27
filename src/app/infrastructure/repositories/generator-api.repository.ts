import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { GeneradorResiduoRepository } from 'src/app/domain/repositories/generator.repository';
import { 
  GeneradorResiduoCreateDto, 
  GeneradorResiduoUpdateDto, 
  GeneradorResiduoReadDto, 
  GeneradorResiduoDetalleDto 
} from 'src/app/application/dto/generator.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class GeneradorResiduoApiRepository implements GeneradorResiduoRepository {
  private url = endpoints.generator; 

  constructor(private http: HttpClient) {}

  async create(dto: GeneradorResiduoCreateDto): Promise<GeneradorResiduoReadDto> {
    console.log('Creating GeneradorResiduo with DTO:', dto);
    return await firstValueFrom(
      this.http.post<GeneradorResiduoReadDto>(this.url, dto)
    );
  }

  async update(id: string, dto: GeneradorResiduoUpdateDto): Promise<GeneradorResiduoReadDto> {
    return await firstValueFrom(
      this.http.put<GeneradorResiduoReadDto>(`${this.url}/${id}`, dto)
    );
  }

  async getById(id: string): Promise<GeneradorResiduoReadDto | null> {
    return await firstValueFrom(
      this.http.get<GeneradorResiduoReadDto>(`${this.url}/${id}`)
    );
  }

  async getAll(): Promise<GeneradorResiduoReadDto[]> {
    return await firstValueFrom(
      this.http.get<GeneradorResiduoReadDto[]>(this.url)
    );
  }

  async getAllDetalle(): Promise<GeneradorResiduoDetalleDto[]> {
    return await firstValueFrom(
      this.http.get<GeneradorResiduoDetalleDto[]>(`${this.url}`)
    );
  }
}
