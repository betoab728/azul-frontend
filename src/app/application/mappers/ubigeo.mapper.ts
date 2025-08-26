import { DepartamentoDto, ProvinciaDto, DistritoDto } from "src/app/application/dto/ubigeo.dto";
import { Departamento, Provincia, Distrito } from "src/app/domain/entities/ubigeo.entity";

export class UbigeoMapper {
  // Departamento
  static fromDepartamentoDto(dto: DepartamentoDto): Departamento {
    return {
      id: dto.id,
      nombre: dto.nombre
    };
  }

  static fromDepartamentoDtoList(dtos: DepartamentoDto[]): Departamento[] {
    return dtos.map(this.fromDepartamentoDto);
  }

  // Provincia
  static fromProvinciaDto(dto: ProvinciaDto, idDepartamento?: number): Provincia {
    return {
      id: dto.id,
      nombre: dto.nombre,
      idDepartamento
    };
  }

  static fromProvinciaDtoList(dtos: ProvinciaDto[], idDepartamento?: number): Provincia[] {
    return dtos.map(d => this.fromProvinciaDto(d, idDepartamento));
  }

  // Distrito
  static fromDistritoDto(dto: DistritoDto, idProvincia?: number): Distrito {
    return {
      id: dto.id,
      nombre: dto.nombre,
      idProvincia
    };
  }

  static fromDistritoDtoList(dtos: DistritoDto[], idProvincia?: number): Distrito[] {
    return dtos.map(d => this.fromDistritoDto(d, idProvincia));
  }
}
