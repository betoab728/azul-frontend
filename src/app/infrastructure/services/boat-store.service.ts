import { Injectable, signal, computed } from '@angular/core';
import { EmbarcacionDetalle } from 'src/app/domain/entities/boat.entity';
import { GetAllEmbarcacionesUseCase } from 'src/app/application/use-cases/boats/get-all-boat.use-case';

@Injectable({ providedIn: 'root' })
export class EmbarcacionStoreService {
  private _embarcaciones = signal<EmbarcacionDetalle[]>([]);
  private _isLoaded = signal(false);

  // Computed properties
  embarcaciones = computed(() => this._embarcaciones());
  isLoaded = computed(() => this._isLoaded());

  constructor(
    private getAllEmbarcacionesUseCase: GetAllEmbarcacionesUseCase
  ) {}

  async load() {
    // Solo hace la consulta si aún no se cargó
    if (this._isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    const data = await this.getAllEmbarcacionesUseCase.execute();
    this._embarcaciones.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._embarcaciones.set([]);
    this._isLoaded.set(false);
  }
}
