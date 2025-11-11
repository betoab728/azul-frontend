import { Injectable, signal,computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from 'src/app/infrastructure/config/endpoints';
import { firstValueFrom } from 'rxjs';
import { OrdenCrearResponse, OrdenCreate, OrdenDocumentos, OrdenEncabezado, OrdenListado } from 'src/app/domain/entities/order.entity';


@Injectable({ providedIn: 'root' })
export class OrdenTrasladoService {
  private url = endpoints.orders; // ejemplo: `${environment.apiUrl}/ordenes`
  private archivosUrl = endpoints.files

  encabezado = signal<OrdenEncabezado | null>(null);
  private _orderesList = signal<OrdenListado[]>([]);
  private _isLoaded = signal(false);

  private _ordenesGeneradorList = signal<OrdenListado[]>([]);
  private _isGeneradorLoaded = signal(false);

  ordenesGeneradorList = computed(() => this._ordenesGeneradorList());
  isGeneradorLoaded = computed(() => this._isGeneradorLoaded());

  constructor(private http: HttpClient) {}

  // Lectura segura
  orderesList = computed(() => this._orderesList());
  isLoaded = computed(() => this._isLoaded());

  /**
   * Carga el encabezado de una nueva orden (fecha, serie, número y razón social)
   */
  async obtenerEncabezado() {
    console.log('Consultando encabezado desde', `${this.url}encabezado`);
    const data = await firstValueFrom(
        this.http.get<OrdenEncabezado>(`${this.url}encabezado`)
        );
    this.encabezado.set(data ?? null);
    return data;
  }
  
  //crear orden de traslado
  async crearOrden(data:OrdenCreate) {
    const formData = new FormData();
    formData.append('id_cotizacion', data.id_cotizacion);
    if (data.observaciones) {
      formData.append('observaciones', data.observaciones);
    }
    formData.append('pdf_file', data.pdf_file);

    const response  = await firstValueFrom(
      this.http.post<OrdenCrearResponse>(this.url, formData)
    );

    if (response?.data) {
      await this.reload(); // vuelve a consultar la API
    }

    return response;
  }

  async listarOrdenes(forceReload = false){
    if (this._isLoaded() && !forceReload) return;
    try {
        const data = await firstValueFrom(
        this.http.get<OrdenListado[]>(this.url));
        this._orderesList.set(data ?? []);
        this._isLoaded.set(true);
    } catch (error) {
        console.error('Error cargando ordenes de traslado:', error);
        this._orderesList.set([]);
        this._isLoaded.set(false);
    }
  }

  async listarOrdenesPorGenerador(forceReload = false) {
    if (this._isGeneradorLoaded() && !forceReload) return;
    try {
      const data = await firstValueFrom(
        this.http.get<OrdenListado[]>(`${this.url}/generador`)
      );
      this._ordenesGeneradorList.set(data ?? []);
      this._isGeneradorLoaded.set(true);
    } catch (error) {
      console.error('Error cargando órdenes del generador:', error);
      this._ordenesGeneradorList.set([]);
      this._isGeneradorLoaded.set(false);
    }
  }

  async reload() {
    this._isLoaded.set(false);
    this._orderesList.set([]);
    await this.listarOrdenes(true);
  }

  async reloadGenerador() {
    this._isGeneradorLoaded.set(false);
    this._ordenesGeneradorList.set([]);
    await this.listarOrdenesPorGenerador(true);
  }


  async getDocumentos(id : string) {
    const url = `${this.url}/${id}/documentos`;
    const data = await firstValueFrom(
      this.http.get<OrdenDocumentos>(url)
    );
    return data;
  }

  async subirDocumento(id: string, tipo: string, formData: FormData) {
    const url = `${this.url}/${id}/documentos/${tipo}`;
    await firstValueFrom(
      this.http.post<{ mensaje: string }>(url, formData)
    );
  }

  clear() {
    this._orderesList.set([]);
    this._isLoaded.set(false);
  }

  clearGenerador() {
    this._ordenesGeneradorList.set([]);
    this._isGeneradorLoaded.set(false);
  }

  /* @param fileKey Ejemplo: "cotizaciones/20251010160508_modelo cotizacion.pdf"
  */
 async obtenerUrlDescarga(fileKey: string): Promise<string> {
   const url = `${this.archivosUrl}/descargar/${encodeURIComponent(fileKey)}`;
   const response = await firstValueFrom(this.http.get<{ url: string }>(url));
   return response.url;
 }

}