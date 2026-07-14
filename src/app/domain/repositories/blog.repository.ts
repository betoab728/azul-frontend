import { BlogResponseDto } from '../../application/dto/blog-response.dto';
import { CreateBlogDto } from '../../application/dto/create-blog.dto';

export abstract class BlogRepository {
    abstract getAll(): Promise<BlogResponseDto[]>;
    abstract create(dto: CreateBlogDto): Promise<BlogResponseDto>;
    abstract updateEstado(id: number, estado: string): Promise<BlogResponseDto>;
}
