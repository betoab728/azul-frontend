import { Injectable, signal, computed } from '@angular/core';
import { EmbarcacionDetalle } from 'src/app/domain/entities/boat.entity';
import { GetEmbarcacionesByGenereadorUseCase } from 'src/app/application/use-cases/boats/get-boats-bygenerator.use-case.js';

@Injectable({ providedIn: 'root' })
export class EmbarcacionByGeneradorStoreService {
  private _embarcaciones = signal<EmbarcacionDetalle[]>([]);
  private _isLoaded = signal(false);

  // Exposición reactiva (read-only)
  embarcaciones = computed(() => this._embarcaciones());
  isLoaded = computed(() => this._isLoaded());

  constructor(
    private getByGeneradorUseCase: GetEmbarcacionesByGenereadorUseCase
  ) {}

  async load() {
    // Solo carga si no se ha hecho antes
    if (this._isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    const data = await this.getByGeneradorUseCase.execute();
    this._embarcaciones.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._embarcaciones.set([]);
    this._isLoaded.set(false);
  }
}
