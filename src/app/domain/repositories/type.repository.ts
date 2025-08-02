import { CreateTipoResiduoDto, UpdateTipoResiduoDto, TipoResiduoReadDto, TipoResiduoWithClasificacionDto } from "src/app/application/dto/type.dto";

export abstract class TipoResiduoRepository {
    abstract create(dto: CreateTipoResiduoDto): Promise<TipoResiduoReadDto>;
    abstract update(id: string, dto: UpdateTipoResiduoDto): Promise<TipoResiduoReadDto>;
    abstract getById(id: string): Promise<TipoResiduoReadDto | null>;
    abstract getAll(): Promise<TipoResiduoReadDto[]>;
    abstract getAllWithClasificacion(): Promise<TipoResiduoWithClasificacionDto[]>;
  }