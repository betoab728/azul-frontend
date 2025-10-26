import { HttpClient } from '@angular/common/http';
import { Injectable, signal,computed } from '@angular/core';
import { endpoints } from '../config/endpoints';
import { VehiculoList, VehiculoCreate, VehiculoResponse, VehiculoConTipo } from 'src/app/domain/entities/vehicle';
import { firstValueFrom } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class VehiculoService {
  private url = endpoints.vehicles;
  private url_lista= endpoints.vehiclesDetailed
  private archivosUrl = endpoints.files

  private _vehiculos = signal<VehiculoList[]>([]);
  private _isLoaded = signal(false);

  // Lectura segura
  vehiculos = computed(() => this._vehiculos());
  isLoaded = computed(() => this._isLoaded());

  constructor(private http: HttpClient) {}

  async load(forceReload = false) {
    if (this._isLoaded() && !forceReload) return;

    console.log('Cargando vehículos desde', this.url);
    const data = await firstValueFrom(this.http.get<VehiculoList[]>(this.url_lista));

    this._vehiculos.set(data ?? []);
    this._isLoaded.set(true);
  }

  async create(data: VehiculoCreate) {
    const formData = new FormData();
    // Campos de texto
    formData.append('placa', data.placa);
    if (data.marca) formData.append('marca', data.marca);
    if (data.modelo) formData.append('modelo', data.modelo);
    if (data.anio_fabricacion) formData.append('anio_fabricacion', data.anio_fabricacion.toString());
    if (data.capacidad_toneladas) formData.append('capacidad_toneladas', data.capacidad_toneladas.toString());
    if (data.estado) formData.append('estado', data.estado);
    if (data.observaciones) formData.append('observaciones', data.observaciones);
    formData.append('id_tipo_vehiculo', data.id_tipo_vehiculo);

    // Archivos opcionales
    if (data.tarjeta_propiedad) formData.append('tarjeta_propiedad', data.tarjeta_propiedad);
    if (data.certificado_itv) formData.append('certificado_itv', data.certificado_itv);
    if (data.soat) formData.append('soat', data.soat);
    if (data.tarjeta_circulacion) formData.append('tarjeta_circulacion', data.tarjeta_circulacion);

    const response  = await firstValueFrom(
      this.http.post<VehiculoResponse>(this.url, formData)
    );

    if (response?.data) {
      await this.reload(); // vuelve a consultar la API
    }

    return response;

  }
  //listar por id
  async getById(id: string) {
    const url = `${this.url}${id}`;
    return await firstValueFrom(this.http.get<VehiculoConTipo>(url));
  }

  async reload() {
    await this.load(true);
  }

  clear() {
    this._vehiculos.set([]);
    this._isLoaded.set(false);
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