import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from '../config/endpoints';

export interface DetalleSolicitud {
  residuo: string;
  cantidad: number;
  unidad: string;
}

@Injectable({ providedIn: 'root' })
export class DetalleSolicitudService {
  private url = endpoints.requestDetail;

  detalles = signal<DetalleSolicitud[]>([]);

  constructor(private http: HttpClient) {}

  async loadBySolicitud(idSolicitud: string) {
    try {
      const endpoint = `${this.url}/${idSolicitud}`;
      const data = await firstValueFrom(
        this.http.get<DetalleSolicitud[]>(endpoint)
      );
      this.detalles.set(data ?? []);
    } catch (err) {
      console.error('Error cargando detalles de solicitud:', err);
      this.detalles.set([]); // fallback en caso de error
    }
  }

  clear() {
    this.detalles.set([]);
  }
}
