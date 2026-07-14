import { Injectable } from '@angular/core';
import { BlogRepository } from '../../../domain/repositories/blog.repository';
import { Blog } from '../../../domain/entities/blog.entity';
import { BlogResponseDto } from '../../dto/blog-response.dto';

@Injectable({
  providedIn: 'root'
})
export class GetBlogUseCase {
  constructor(private blogRepository: BlogRepository) {}

  async execute(): Promise<Blog[]> {
    const dtos = await this.blogRepository.getAll();
    return dtos.map(dto => this.mapToEntity(dto));
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
