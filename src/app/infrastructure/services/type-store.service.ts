import { Injectable, signal, computed } from '@angular/core';
import { TipoResiduoWithClasificacion } from 'src/app/domain/entities/types.entity';
import { GetAllTiposWithClasificacionUseCase } from 'src/app/application/use-cases/types/get-all-types.use-case';


@Injectable({ providedIn: 'root' })
export class TipoResiduoStoreService {
  private _tipos = signal<TipoResiduoWithClasificacion[]>([]);
  private _isLoaded = signal(false);

  tipos = computed(() => this._tipos());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getAllTiposUseCase: GetAllTiposWithClasificacionUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    await this.refresh(); // centraliza la lógica
  }

  async refresh() {
    const data = await this.getAllTiposUseCase.execute();
    this._tipos.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._tipos.set([]);
    this._isLoaded.set(false);
  }
}
