import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config/endpoints';
import { firstValueFrom } from 'rxjs';

export interface EstadoSolicitud {
  id: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class EstadoSolicitudService {
  private url = endpoints.status; 

  estados = signal<EstadoSolicitud[]>([]);

  constructor(private http: HttpClient) {}

  async load() {
    try {
      const data = await firstValueFrom(this.http.get<EstadoSolicitud[]>(this.url));
      this.estados.set(data ?? []);
    } catch (err) {
      console.error('Error cargando estados de solicitud:', err);
      this.estados.set([]); // fallback en caso de error
    }
  }
}
