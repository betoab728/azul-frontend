//implementacioin de la interfaz
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoResiduoRepository } from 'src/app/domain/repositories/type.repository';
import { CreateTipoResiduoDto, UpdateTipoResiduoDto, TipoResiduoReadDto, TipoResiduoWithClasificacionDto  } from 'src/app/application/dto/type.dto';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';



@Injectable()
export class TipoResiduoApiRepository implements TipoResiduoRepository {
    private url = endpoints.types; // URL del endpoint de tipos de residuos

    constructor(private http: HttpClient) {}

    async create(dto: CreateTipoResiduoDto): Promise<TipoResiduoReadDto> {
        return await firstValueFrom(this.http.post<TipoResiduoReadDto>(this.url, dto));
      }

    async update(id: string, dto: UpdateTipoResiduoDto): Promise<TipoResiduoReadDto> {
        return await firstValueFrom(
          this.http.put<TipoResiduoReadDto>(`${this.url}/${id}`, dto)
        );
    }

    async getById(id: string): Promise<TipoResiduoReadDto | null> {
        return await firstValueFrom(
          this.http.get<TipoResiduoReadDto>(`${this.url}/${id}`)
        );
    } 

    async getAll(): Promise<TipoResiduoReadDto[]> {
        return await firstValueFrom(
          this.http.get<TipoResiduoReadDto[]>(this.url)
        );
    }

    async getAllWithClasificacion(): Promise<TipoResiduoWithClasificacionDto[]> {
        return await firstValueFrom(
          this.http.get<TipoResiduoWithClasificacionDto[]>(this.url)
        );
    }
    
}