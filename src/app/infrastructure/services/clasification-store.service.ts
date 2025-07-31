import { Injectable, signal, computed } from '@angular/core';
import { Classification } from 'src/app/domain/entities/classification.entity';
import { GetAllClassificationsUseCase } from 'src/app/application/use-cases/classifications/get-all-classifications.use-case';

@Injectable({ providedIn: 'root' })
export class ClassificationStoreService {
  private _classifications = signal<Classification[]>([]);
  private _isLoaded = signal(false);

  classifications = computed(() => this._classifications());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getAllClassificationsUseCase: GetAllClassificationsUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    const data = await this.getAllClassificationsUseCase.execute();
    this._classifications.set(data);
    this._isLoaded.set(true);
  }

  async refresh() {
    const data = await this.getAllClassificationsUseCase.execute();
    this._classifications.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._classifications.set([]);
    this._isLoaded.set(false);
  }
}