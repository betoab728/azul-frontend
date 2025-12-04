import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { PuntoTrazabilidad } from 'src/app/domain/entities/traceability.entity';


@Injectable({ providedIn: 'root' })
export class TraceabilityService {

  private url = endpoints.traceability; // Ejemplo: `${environment.apiUrl}/trazabilidad`

  constructor(private http: HttpClient) {}

  async getByOrden(idOrden: string): Promise<PuntoTrazabilidad[]> {
    const url = `${this.url}orden/${idOrden}`;
    console.log('Fetching traceability points from URL:', url);
    return await firstValueFrom(this.http.get<PuntoTrazabilidad[]>(url));
  }
}