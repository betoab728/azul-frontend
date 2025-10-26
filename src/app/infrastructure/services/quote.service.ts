import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { CotizacionCreate, CotizacionResponse, CotizacionList } from 'src/app/domain/entities/quote.entity';

@Injectable({
    providedIn: 'root'
  })
  export class CotizacionService {
    private baseUrl = endpoints.quotes; // ej: `${environment.apiUrl}/cotizaciones`
    private archivosUrl = endpoints.files
  
    constructor(private http: HttpClient) {}
  
    async crearCotizacion(data: CotizacionCreate): Promise<CotizacionResponse> {
      const formData = new FormData();
      formData.append('id_solicitud', data.id_solicitud);
      formData.append('forma_pago', data.forma_pago);
      formData.append('fecha_emision', data.fecha_emision);
      formData.append('id_estado_cotizacion', data.id_estado_cotizacion);
      formData.append('observaciones', data.observaciones);
      formData.append('pdf_file', data.pdf_file);
      formData.append('id_vehiculo', data.id_vehiculo);

      return await firstValueFrom(
        this.http.post<CotizacionResponse>(this.baseUrl, formData)
      );
    }

    /**
   * 🔹 Genera una URL firmada temporal para visualizar/descargar un PDF
   * @param fileKey Ejemplo: "cotizaciones/20251010160508_modelo cotizacion.pdf"
   */
  async obtenerUrlDescarga(fileKey: string): Promise<string> {
    const url = `${this.archivosUrl}/descargar/${encodeURIComponent(fileKey)}`;
    const response = await firstValueFrom(this.http.get<{ url: string }>(url));
    return response.url;
  }


  }