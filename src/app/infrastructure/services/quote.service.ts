import { Injectable,signal,computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { CotizacionCreate, CotizacionResponse, CotizacionList } from 'src/app/domain/entities/quote.entity';
import { GeneradorResiduoCotizacion } from 'src/app/domain/entities/generator.entity';

@Injectable({
    providedIn: 'root'
  })

  @Injectable({ providedIn: 'root' })
export class CotizacionService {
  private url = endpoints.quotes;       // Ejemplo: `${environment.apiUrl}/cotizaciones`
  private archivosUrl = endpoints.files; // Ejemplo: `${environment.apiUrl}/archivos`

  //Signals (estado reactivo)
  private _cotizaciones = signal<CotizacionList[]>([]);
  private _isLoaded = signal(false);
  cotizaciones = computed(() => this._cotizaciones());
  isLoaded = computed(() => this._isLoaded());

  // Signals por generador
  private _cotizacionesGenerador = signal<CotizacionList[]>([]);
  private _isLoadedGenerador = signal(false);
  cotizacionesGenerador = computed(() => this._cotizacionesGenerador());
  isLoadedGenerador = computed(() => this._isLoadedGenerador());


  constructor(private http: HttpClient) {}

  // Cargar listado de cotizaciones (una sola vez o forzado)
  async listarCotizaciones(forceReload = false) {
    if (this._isLoaded() && !forceReload) return;

    try {
      const data = await firstValueFrom(
        this.http.get<CotizacionList[]>(this.url)
      );
      this._cotizaciones.set(data ?? []);
      this._isLoaded.set(true);
    } catch (error) {
      console.error('Error cargando cotizaciones:', error);
      this._cotizaciones.set([]);
      this._isLoaded.set(false);
    }
  }

  // Listar cotizaciones por generador
  async listarPorGenerador(forceReload = false) {
    if (this._isLoadedGenerador() && !forceReload) return;
    try {
      const data = await firstValueFrom(
        this.http.get<CotizacionList[]>(`${this.url}generador`)
       
      );
      this._cotizacionesGenerador.set(data ?? []);
      this._isLoadedGenerador.set(true);
      console.log('Cotizaciones por generador cargadas:', data);
    } catch (error) {
      console.error('Error cargando cotizaciones del generador:', error);
      this._cotizacionesGenerador.set([]);
      this._isLoadedGenerador.set(false);
    }
  }

  // 🔹 Crear una nueva cotización
  async crearCotizacion(data: CotizacionCreate): Promise<CotizacionResponse> {
    const formData = new FormData();
    formData.append('id_solicitud', data.id_solicitud);
    formData.append('forma_pago', data.forma_pago);
    formData.append('fecha_emision', data.fecha_emision);
    formData.append('id_estado_cotizacion', data.id_estado_cotizacion);
    formData.append('observaciones', data.observaciones);
    formData.append('pdf_file', data.pdf_file);
    formData.append('id_vehiculo', data.id_vehiculo);

    const response = await firstValueFrom(
      this.http.post<CotizacionResponse>(this.url, formData)
    );

    if (response?.data) {
      await this.reload(); // vuelve a cargar lista actualizada
    }

    return response;
  }

  // 🔹 Generar URL firmada para descargar/ver PDF
  async obtenerUrlDescarga(fileKey: string): Promise<string> {
    const url = `${this.archivosUrl}/descargar/${encodeURIComponent(fileKey)}`;
    const response = await firstValueFrom(this.http.get<{ url: string }>(url));
    return response.url;
  }

  // 🔹 Refrescar datos (forzar recarga desde API)
  async reload() {
    this._isLoaded.set(false);
    this._cotizaciones.set([]);
    await this.listarCotizaciones(true);
  }

  // 🔹 Refrescar cotizaciones por generador
  async reloadPorGenerador() {
    this._isLoadedGenerador.set(false);
    this._cotizacionesGenerador.set([]);
    await this.listarPorGenerador(true);
  }


  clear() {
    this._cotizaciones.set([]);
    this._isLoaded.set(false);
  }

  clearGenerador() {
    this._cotizacionesGenerador.set([]);
    this._isLoadedGenerador.set(false);
  }

  async getDatosGenerador(idSolicitud: string) {
    const data = await firstValueFrom(
      this.http.get<GeneradorResiduoCotizacion>(`${this.url}generador/${idSolicitud}`)
    );
    return data;
  }

}