import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from '../config/endpoints';
import { SolicitudGeneradorList } from 'src/app/domain/entities/request.entity';

@Injectable({ providedIn: 'root' })
export class SolicitudGeneradorService {
  private url = endpoints.requestsGenerator; 
  // Ejemplo en endpoints: solicitudesGenerador: 'http://localhost:8000/solicitudes/generador'

  solicitudes = signal<SolicitudGeneradorList[]>([]);
  isLoaded = signal(false);

  constructor(private http: HttpClient) {}

  async load() {
    if (this.isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    try {

      const data = await firstValueFrom(

        this.http.get<SolicitudGeneradorList[]>(`${this.url}`)
      );
      this.solicitudes.set(data ?? []);
      this.isLoaded.set(true);
    } catch (err) {
      console.error('Error cargando solicitudes del generador:', err);
      this.solicitudes.set([]);
      this.isLoaded.set(false);
    }
  }

  clear() {
    this.solicitudes.set([]);
    this.isLoaded.set(false);
  }
}
