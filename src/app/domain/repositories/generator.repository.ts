import { 
    GeneradorResiduoCreateDto, 
    GeneradorResiduoUpdateDto, 
    GeneradorResiduoReadDto, 
    GeneradorResiduoDetalleDto ,
    
  } from 'src/app/application/dto/generator.dto';

  
export abstract class GeneradorResiduoRepository {
    abstract create(dto: GeneradorResiduoCreateDto ): Promise<GeneradorResiduoReadDto>;
    abstract update(id: string, dto: GeneradorResiduoUpdateDto ): Promise<GeneradorResiduoReadDto>;
    abstract getById(id: string): Promise<GeneradorResiduoReadDto | null>;
    abstract getAll(): Promise<GeneradorResiduoReadDto[]>;
    abstract getAllDetalle(): Promise<GeneradorResiduoDetalleDto[]>;
  }