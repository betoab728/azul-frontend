import { Injectable, signal, computed } from '@angular/core';
import { Blog } from 'src/app/domain/entities/blog.entity';
import { GetBlogUseCase } from 'src/app/application/use-cases/blog/get-blog.use-case';

@Injectable({ providedIn: 'root' })
export class BlogStoreService {
  private _blogs = signal<Blog[]>([]);
  private _isLoaded = signal(false);

  blogs = computed(() => this._blogs());
  isLoaded = computed(() => this._isLoaded());

  constructor(private getBlogUseCase: GetBlogUseCase) {}

  async load() {
    if (this._isLoaded()) return;
    const data = await this.getBlogUseCase.execute();
    this._blogs.set(data);
    this._isLoaded.set(true);
  }

  async refresh() {
    const data = await this.getBlogUseCase.execute();
    this._blogs.set(data);
    this._isLoaded.set(true);
  }

  clear() {
    this._blogs.set([]);
    this._isLoaded.set(false);
  }
}
