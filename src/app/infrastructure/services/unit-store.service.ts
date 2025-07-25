import { Injectable, signal, computed } from '@angular/core';
import { Unit } from 'src/app/domain/entities/unit.entity';
import { GetAllUnitsUseCase } from 'src/app/application/use-cases/units/get-all-units.use-case';

@Injectable({ providedIn: 'root' })
export class UnitStoreService {
  private _units = signal<Unit[]>([]);
  private _isLoaded = signal(false);

  units = computed(() => this._units());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getAllUnitsUseCase: GetAllUnitsUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    const data = await this.getAllUnitsUseCase.execute();
    this._units.set(data);
    this._isLoaded.set(true);
  }

  async refresh() {
    const data = await this.getAllUnitsUseCase.execute();
    this._units.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._units.set([]);
    this._isLoaded.set(false);
  }
}