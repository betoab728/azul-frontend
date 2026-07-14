import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BlogRepository } from '../../domain/repositories/blog.repository';
import { BlogResponseDto } from '../../application/dto/blog-response.dto';
import { CreateBlogDto } from '../../application/dto/create-blog.dto';
import { UpdateBlogEstadoDto } from '../../application/dto/update-blog-estado.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class BlogApiRepository implements BlogRepository {
  private url = endpoints.blog;

  constructor(private http: HttpClient) {}

  async getAll(): Promise<BlogResponseDto[]> {
    return await firstValueFrom(this.http.get<BlogResponseDto[]>(this.url));
  }

  async create(dto: CreateBlogDto): Promise<BlogResponseDto> {
    return await firstValueFrom(this.http.post<BlogResponseDto>(this.url, dto));
  }

  async updateEstado(id: number, estado: string): Promise<BlogResponseDto> {
    const body: UpdateBlogEstadoDto = { estado };
    return await firstValueFrom(this.http.patch<BlogResponseDto>(`${this.url}/${id}/estado`, body));
  }
}
