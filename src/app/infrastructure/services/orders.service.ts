import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { firstValueFrom } from 'rxjs';
import { OrdenEncabezado } from 'src/app/domain/entities/order.entity';


@Injectable({ providedIn: 'root' })
export class OrdenTrasladoService {
  private url = endpoints.orders; // ejemplo: `${environment.apiUrl}/ordenes`

  encabezado = signal<OrdenEncabezado | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Carga el encabezado de una nueva orden (fecha, serie, número y razón social)
   */
  async obtenerEncabezado() {
    console.log('Consultando encabezado desde', `${this.url}/encabezado`);
    const data = await firstValueFrom(
        this.http.get<OrdenEncabezado>(`${this.url}/encabezado`)
        );
    this.encabezado.set(data ?? null);
    return data;
  }
}