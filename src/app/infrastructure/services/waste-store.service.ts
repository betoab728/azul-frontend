import { Injectable, signal, computed } from '@angular/core';
import { RegistroResiduoDetalle } from 'src/app/domain/entities/waste.entity';
import { GetAllRegistroResiduosDetalleUseCase } from 'src/app/application/use-cases/wastes/get-all-waste.use-case';

@Injectable({ providedIn: 'root' })
export class RegistroResiduoStoreService {
  private _registros = signal<RegistroResiduoDetalle[]>([]);
  private _isLoaded = signal(false);

  registros = computed(() => this._registros());
  isLoaded = computed(() => this._isLoaded());

  constructor(
    private getAllDetalleUseCase: GetAllRegistroResiduosDetalleUseCase
  ) {}

  async load() {
    if (this._isLoaded()) return;
    await this.refresh();
  }

  async refresh() {
    const data = await this.getAllDetalleUseCase.execute();
    this._registros.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._registros.set([]);
    this._isLoaded.set(false);
  }
}
