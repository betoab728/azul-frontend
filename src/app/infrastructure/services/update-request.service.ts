import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable({
    providedIn: 'root'
  })
export class UpdateSolicitudService {
  private url = endpoints.requests;

  constructor(private http: HttpClient) {}

  async actualizarEstado(idSolicitud: string, idEstado: string) {
    const url = `${this.url}/${idSolicitud}/estado/${idEstado}`;
    return firstValueFrom(this.http.patch(url, {}));
  }
}