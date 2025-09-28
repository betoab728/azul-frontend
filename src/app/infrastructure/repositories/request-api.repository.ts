import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SolicitudCotizacionRepository } from 'src/app/domain/repositories/request.repository';
import { 
  CreateSolicitudDto, 
  SolicitudCotizacionReadDto, 
  SolicitudCotizacionListDto 
} from 'src/app/application/dto/request.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class SolicitudCotizacionApiRepository implements SolicitudCotizacionRepository {
  private url = endpoints.requests; 

  constructor(private http: HttpClient) {}

  // Crear solicitud
  async create(dto: CreateSolicitudDto): Promise<SolicitudCotizacionReadDto> {
    return await firstValueFrom(
      this.http.post<SolicitudCotizacionReadDto>(this.url, dto)
    );
  }

  // Listar todas
  async getAll(): Promise<SolicitudCotizacionListDto[]> {
    return await firstValueFrom(
      this.http.get<SolicitudCotizacionListDto[]>(this.url)
    );
  }

  // Listar por embarcación
  async getByEmbarcacion(idEmbarcacion: string): Promise<SolicitudCotizacionListDto[]> {
    return await firstValueFrom(
      this.http.get<SolicitudCotizacionListDto[]>(`${this.url}/embarcacion/${idEmbarcacion}`)
    );
  }

  // Listar por generador
  async getByGenerador(idGenerador: string): Promise<SolicitudCotizacionListDto[]> {
    return await firstValueFrom(
      this.http.get<SolicitudCotizacionListDto[]>(`${this.url}/generador/${idGenerador}`)
    );
  }

  // Listar por puerto
  async getByPuerto(idPuerto: string): Promise<SolicitudCotizacionListDto[]> {
    return await firstValueFrom(
      this.http.get<SolicitudCotizacionListDto[]>(`${this.url}/puerto/${idPuerto}`)
    );
  }

  // Actualizar estado
  async updateEstado(id: string, idEstadoSolicitud: string): Promise<SolicitudCotizacionReadDto> {
    return await firstValueFrom(
      this.http.patch<SolicitudCotizacionReadDto>(`${this.url}/${id}/estado`, { idEstadoSolicitud })
    );
  }
}
