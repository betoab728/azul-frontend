import { Injectable, signal, computed } from '@angular/core';
import { SolicitudCotizacionList } from 'src/app/domain/entities/request.entity';
import { GetAllSolicitudesUseCase } from 'src/app/application/use-cases/requests/get-all';

@Injectable({ providedIn: 'root' })
export class SolicitudStoreService {
  private _solicitudes = signal<SolicitudCotizacionList[]>([]);
  private _isLoaded = signal(false);

  // Exponemos los signals como propiedades computadas
  solicitudes = computed(() => this._solicitudes());
  isLoaded = computed(() => this._isLoaded());

  constructor(
    private readonly getAllSolicitudesUseCase: GetAllSolicitudesUseCase
  ) {}

  async load() {
    // Solo consulta la API si aún no se cargó
    if (this._isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    const data = await this.getAllSolicitudesUseCase.execute();
    this._solicitudes.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._solicitudes.set([]);
    this._isLoaded.set(false);
  }
}
