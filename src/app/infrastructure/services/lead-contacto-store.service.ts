import { Injectable, signal, computed } from '@angular/core';
import { LeadContacto } from 'src/app/domain/entities/lead-contacto.entity';
import { GetLeadsContactoUseCase } from 'src/app/application/use-cases/leads-contacto/get-leads-contacto.use-case';

@Injectable({ providedIn: 'root' })
export class LeadContactoStoreService {
  private _leads = signal<LeadContacto[]>([]);
  private _isLoaded = signal(false);

  leads = computed(() => this._leads());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getLeadsContactoUseCase: GetLeadsContactoUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    const data = await this.getLeadsContactoUseCase.execute();
    this._leads.set(data);
    this._isLoaded.set(true);
  }

  async refresh() {
    const data = await this.getLeadsContactoUseCase.execute();
    this._leads.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._leads.set([]);
    this._isLoaded.set(false);
  }
}
