import { 
    TipoEmbarcacionCreateDto, 
    TipoEmbarcacionUpdateDto, 
    TipoEmbarcacionReadDto 
  } from 'src/app/application/dto/boat-type.dto.js';
  
  export abstract class TipoEmbarcacionRepository {
    abstract create(dto: TipoEmbarcacionCreateDto): Promise<TipoEmbarcacionReadDto>;
    abstract update(id: string, dto: TipoEmbarcacionUpdateDto): Promise<TipoEmbarcacionReadDto>;
    abstract getById(id: string): Promise<TipoEmbarcacionReadDto | null>;
    abstract getAll(): Promise<TipoEmbarcacionReadDto[]>;
  }