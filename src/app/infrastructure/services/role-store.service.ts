import { Injectable, signal, computed } from '@angular/core';
import { Role } from 'src/app/domain/entities/role.entity';
import { GetAllRolesUseCase } from 'src/app/application/use-cases/roles/get-all-roles.use-case';

@Injectable({ providedIn: 'root' })
export class RoleStoreService {
  private _roles = signal<Role[]>([]);
  private _isLoaded = signal(false);

  roles = computed(() => this._roles());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getAllRolesUseCase: GetAllRolesUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    const data = await this.getAllRolesUseCase.execute();
    this._roles.set(data);
    this._isLoaded.set(true);
  }

  async refresh() {
    const data = await this.getAllRolesUseCase.execute();
    this._roles.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._roles.set([]);
    this._isLoaded.set(false);
  }
}
