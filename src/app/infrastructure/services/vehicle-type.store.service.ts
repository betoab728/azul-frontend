import { Injectable, signal,computed } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config/endpoints';
import { TipoVehiculoResponse, TipoVehiculoCreate } from 'src/app/domain/entities/vehicle-type.entity';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TipoVehiculoService {
  private url = endpoints.vehiclestypes; // Ejemplo: 'http://localhost:8000/tipos-vehiculo'

  private _tipos = signal<TipoVehiculoResponse[]>([]);
  private _isLoaded = signal(false);

   // Exponemos signals como "computed" para lectura segura
   tipos = computed(() => this._tipos());
   isLoaded = computed(() => this._isLoaded());

  constructor(private http: HttpClient) {}

  async load() {
    if (this._isLoaded()) return;

    console.log('Cargando tipos de vehículo desde', this.url);
    const data = await firstValueFrom(this.http.get<TipoVehiculoResponse[]>(this.url)); // ✅ reemplazo de toPromise()

    this._tipos.set(data ?? []);
    this._isLoaded.set(true);
  }

  async create(tipo: TipoVehiculoCreate) {
    const nuevo = await firstValueFrom(this.http.post<TipoVehiculoResponse>(this.url, tipo)); // ✅ reemplazo de toPromise()

    if (nuevo) {
      this._tipos.update(list => [...list, nuevo]);
    }
  }

  clear() {
    this._tipos.set([]);
    this._isLoaded.set(false);
  }
}
