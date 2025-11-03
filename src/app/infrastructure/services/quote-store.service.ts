import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { CotizacionList } from 'src/app/domain/entities/quote.entity';
/*
@Injectable({ providedIn: 'root' })
export class CotizacionSignalService {
  private url = endpoints.quotes; // Ejemplo: http://localhost:8000/cotizaciones

  cotizaciones = signal<CotizacionList[]>([]);
  isLoaded = signal(false);

  constructor(private http: HttpClient) {}

  async load() {
    if (this.isLoaded()) return; // Evita recargar si ya se consultó
    await this.refresh();
  }

  async refresh() {
    try {
      const data = await firstValueFrom(
        this.http.get<CotizacionList[]>(this.url)
      );
      this.cotizaciones.set(data ?? []);
      this.isLoaded.set(true);
    } catch (err) {
      console.error('Error cargando cotizaciones:', err);
      this.cotizaciones.set([]);
      this.isLoaded.set(false);
    }
  }

  clear() {
    this.cotizaciones.set([]);
    this.isLoaded.set(false);
  }
}
*/