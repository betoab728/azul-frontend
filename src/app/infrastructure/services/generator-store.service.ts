import { Injectable, signal, computed } from '@angular/core';
import { GeneradorResiduoDetalle } from 'src/app/domain/entities/generator.entity.js';
import { GetAllGeneradoresResiduosUseCase } from 'src/app/application/use-cases/generator/get-all-generator.use-case';

@Injectable({ providedIn: 'root' })
export class GeneradorResiduoStoreService {
  private _generadores = signal<GeneradorResiduoDetalle[]>([]);
  private _isLoaded = signal(false);

  generadores = computed(() => this._generadores());
  isLoaded = computed(() => this._isLoaded());

  constructor(
    private getAllGeneradoresUseCase: GetAllGeneradoresResiduosUseCase
  ) {}

  async load() {
    if (this._isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    const data = await this.getAllGeneradoresUseCase.execute();
    this._generadores.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._generadores.set([]);
    this._isLoaded.set(false);
  }
}
