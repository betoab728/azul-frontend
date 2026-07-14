import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BlogRepository } from '../../domain/repositories/blog.repository';
import { BlogResponseDto } from '../../application/dto/blog-response.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class BlogApiRepository implements BlogRepository {
  private url = endpoints.blog;

  constructor(private http: HttpClient) {}

  async getAll(): Promise<BlogResponseDto[]> {
    return await firstValueFrom(this.http.get<BlogResponseDto[]>(this.url));
  }
}
