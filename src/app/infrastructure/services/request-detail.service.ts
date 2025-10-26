import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from '../config/endpoints';
import { DetalleSolicitudCarrito } from 'src/app/domain/entities/request.entity';

@Injectable({ providedIn: 'root' })
export class DetalleSolicitudService {
  private url = endpoints.requestDetail;

  detalles = signal<DetalleSolicitudCarrito[]>([]);

  constructor(private http: HttpClient) {}

  async loadBySolicitud(idSolicitud: string) {
    try {
      const endpoint = `${this.url}/${idSolicitud}`;
      const data = await firstValueFrom(
        this.http.get<DetalleSolicitudCarrito[]>(endpoint)
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
