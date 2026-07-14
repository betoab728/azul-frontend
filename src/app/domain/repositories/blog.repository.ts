import { BlogResponseDto } from '../../application/dto/blog-response.dto';

export abstract class BlogRepository {
    abstract getAll(): Promise<BlogResponseDto[]>;
}
