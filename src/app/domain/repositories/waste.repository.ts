import { CreateRegistroResiduoDto,RegistroResiduoReadDto,
    UpdateRegistroResiduoDto, RegistroResiduoDetalleDto } from 'src/app/application/dto/waste.dto';

export abstract class RegistroResiduoRepository {
    abstract create(dto: CreateRegistroResiduoDto): Promise<RegistroResiduoReadDto>;
    abstract update(id: string, dto: UpdateRegistroResiduoDto): Promise<RegistroResiduoReadDto>;
    abstract getById(id: string): Promise<RegistroResiduoReadDto | null>;
    abstract getAll(): Promise<RegistroResiduoReadDto[]>;
    abstract getAllDetalle(): Promise<RegistroResiduoDetalleDto[]>;
}