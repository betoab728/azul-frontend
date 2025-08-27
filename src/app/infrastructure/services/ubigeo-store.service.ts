import { Injectable, signal, computed } from '@angular/core';
import { Departamento, Provincia, Distrito } from 'src/app/domain/entities/ubigeo.entity.js';
import { GetAllDepartamentosUseCase } from 'src/app/application/use-cases/ubigeo/get-departments.use-case.js';
import { GetProvinciasByDepartamentoUseCase } from 'src/app/application/use-cases/ubigeo/get-provinces.use-case.js';
import { GetDistritosByProvinciaUseCase } from 'src/app/application/use-cases/ubigeo/get-districts.use-case.js';

@Injectable({ providedIn: 'root' })
export class UbigeoStoreService {
  private _departamentos = signal<Departamento[]>([]);
  private _provincias = signal<Provincia[]>([]);
  private _distritos = signal<Distrito[]>([]);
  private _isLoadedDepartamentos = signal(false);

  departamentos = computed(() => this._departamentos());
  provincias = computed(() => this._provincias());
  distritos = computed(() => this._distritos());
  isLoadedDepartamentos = computed(() => this._isLoadedDepartamentos());

  constructor(
    private getAllDepartamentos: GetAllDepartamentosUseCase,
    private getProvinciasByDepartamento: GetProvinciasByDepartamentoUseCase,
    private getDistritosByProvincia: GetDistritosByProvinciaUseCase
  ) {}

  /** Cargar departamentos solo una vez */
  async loadDepartamentos() {
    if (this._isLoadedDepartamentos()) return;
    const deps = await this.getAllDepartamentos.execute();
    this._departamentos.set(deps);
    this._isLoadedDepartamentos.set(true);
  }

  /** Provincias dependen de un departamento */
  async loadProvincias(idDepartamento: number) {
    const provs = await this.getProvinciasByDepartamento.execute(idDepartamento);
    this._provincias.set(provs);
    this._distritos.set([]); // reset distritos si cambia provincia
  }

  /** Distritos dependen de una provincia */
  async loadDistritos(idProvincia: number) {
    const dists = await this.getDistritosByProvincia.execute(idProvincia);
    this._distritos.set(dists);
  }

  clear() {
    this._departamentos.set([]);
    this._provincias.set([]);
    this._distritos.set([]);
    this._isLoadedDepartamentos.set(false);
  }
}
