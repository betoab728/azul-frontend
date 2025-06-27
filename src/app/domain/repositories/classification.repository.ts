
import { Classification } from '../entities/classification.entity';
import { ClassificationRequestDto } from '../../application/dto/classification-request.dto';


export abstract class ClassificationRepository {
        abstract getAll(): Promise<Classification[]>;
        abstract create(dto: ClassificationRequestDto): Promise<Classification>;
        abstract update(id: number, nombre: string): Promise<void>;
        abstract delete(id: number): Promise<void>;
    }