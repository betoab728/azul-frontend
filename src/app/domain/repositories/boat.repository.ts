import { 
    EmbarcacionCreateDto, 
    EmbarcacionUpdateDto, 
    EmbarcacionReadDto, 
    EmbarcacionDetalleDto 
  } from 'src/app/application/dto/boat.dto';
  
  export abstract class EmbarcacionRepository {
    abstract create(dto: EmbarcacionCreateDto): Promise<EmbarcacionReadDto>;
    abstract update(id: string, dto: EmbarcacionUpdateDto): Promise<EmbarcacionReadDto>;
    abstract getById(id: string): Promise<EmbarcacionReadDto | null>;
    abstract getAll(): Promise<EmbarcacionReadDto[]>;
    abstract getAllDetalle(): Promise<EmbarcacionDetalleDto[]>;
    abstract getByGenerador(): Promise<EmbarcacionDetalleDto[]>;
  }