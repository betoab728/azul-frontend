import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { UbigeoRepository } from "src/app/domain/repositories/ubigeo.repository";
import { DepartamentoDto, ProvinciaDto, DistritoDto } from "src/app/application/dto/ubigeo.dto";
import { endpoints } from "src/app/infrastructure/config/endpoints";

@Injectable({
  providedIn: "root"
})
export class UbigeoApiRepository extends UbigeoRepository {
  constructor(private http: HttpClient) {
    super();
  }

  async getDepartamentos(): Promise<DepartamentoDto[]> {
    return await firstValueFrom(this.http.get<DepartamentoDto[]>(endpoints.departments));
  }

  async getProvincias(idDepartamento: number): Promise<ProvinciaDto[]> {
    return await firstValueFrom(
      this.http.get<ProvinciaDto[]>(`${endpoints.provinces}${idDepartamento}`)
    );
  }

  async getDistritos(idProvincia: number): Promise<DistritoDto[]> {
    return await firstValueFrom(
      this.http.get<DistritoDto[]>(`${endpoints.districts}${idProvincia}`)
    );
  }
}
