import { Injectable } from '@angular/core';
import { BlogRepository } from '../../../domain/repositories/blog.repository';
import { Blog } from '../../../domain/entities/blog.entity';
import { BlogResponseDto } from '../../dto/blog-response.dto';
import { CreateBlogDto } from '../../dto/create-blog.dto';

@Injectable({
  providedIn: 'root'
})
export class CreateBlogUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(blog: { titulo: string; contenido: string; resumen: string; imagenPortada: string; autor: string }): Promise<Blog> {
    const dto: CreateBlogDto = {
      titulo: blog.titulo,
      contenido: blog.contenido,
      resumen: blog.resumen,
      imagen_portada: blog.imagenPortada,
      autor: blog.autor
    };
    const createdDto = await this.blogRepository.create(dto);
    return this.mapToEntity(createdDto);
  }

  private mapToEntity(dto: BlogResponseDto): Blog {
    return {
      id: dto.id,
      titulo: dto.titulo,
      slug: dto.slug,
      resumen: dto.resumen,
      contenido: dto.contenido,
      imagenPortada: dto.imagen_portada,
      autor: dto.autor,
      estado: dto.estado,
      fechaPublicacion: dto.fecha_publicacion,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at
    };
  }
}
