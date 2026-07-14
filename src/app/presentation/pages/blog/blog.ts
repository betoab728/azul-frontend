import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from '../../../infrastructure/services/blog-store.service';
import { Blog } from '../../../domain/entities/blog.entity';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../infrastructure/services/swal.service.js';

@Component({
  selector: 'app-blog',
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class BlogPage implements OnInit {
  blogs: Blog[] = [];
  loading = true;

  constructor(
    private blogStoreService: BlogStoreService
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.blogStoreService.load();
      this.blogs = this.blogStoreService.blogs();
    } catch (error) {
      console.error('Error al obtener artículos del blog:', error);
      SwalService.error('No se pudieron cargar los artículos del blog');
    } finally {
      this.loading = false;
    }
  }
}
