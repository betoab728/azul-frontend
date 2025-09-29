import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { SolicitudCreate } from 'src/app/domain/entities/request.entity';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { SolicitudCotizacion } from 'src/app/domain/entities/request.entity';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private baseUrl= endpoints.requests;

  constructor(private http: HttpClient) {}

  async crearSolicitud(solicitud: SolicitudCreate): Promise<SolicitudCotizacion> {
    return await firstValueFrom(
        this.http.post<SolicitudCotizacion>(this.baseUrl, solicitud)
    );
  }
}
