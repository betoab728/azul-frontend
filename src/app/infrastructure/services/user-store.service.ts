import { Injectable, signal, computed } from '@angular/core';
import { UserWithRole } from 'src/app/domain/entities/user.entity';
import { GetAllUsersWithRoleUseCase } from 'src/app/application/use-cases/users/get-all-users.use-case';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private _users = signal<UserWithRole[]>([]);
  private _isLoaded = signal(false);

  users = computed(() => this._users());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getAllUsersUseCase: GetAllUsersWithRoleUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    await this.refresh(); // centralizas la lógica
  }

  async refresh() {
    const data = await this.getAllUsersUseCase.execute();
    this._users.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._users.set([]);
    this._isLoaded.set(false);
  }
}