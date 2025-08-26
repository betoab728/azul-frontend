import { DepartamentoDto, ProvinciaDto, DistritoDto } from "src/app/application/dto/ubigeo.dto";

export abstract class UbigeoRepository {
  abstract getDepartamentos(): Promise<DepartamentoDto[]>;
  abstract getProvincias(idDepartamento: number): Promise<ProvinciaDto[]>;
  abstract getDistritos(idProvincia: number): Promise<DistritoDto[]>;
}