import { LeadContactoResponseDto } from '../../application/dto/lead-contacto-response.dto';

export abstract class LeadContactoRepository {
    abstract getAll(): Promise<LeadContactoResponseDto[]>;
}
