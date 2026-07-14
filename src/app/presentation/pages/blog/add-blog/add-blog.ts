import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { CreateBlogUseCase } from 'src/app/application/use-cases/blog/create-blog.use-case';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.html',
  styleUrls: ['./add-blog.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddBlog {
  titulo = '';
  resumen = '';
  contenido = '';
  imagenPortada = '';
  autor = '';

  constructor(
    private createBlogUseCase: CreateBlogUseCase,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.titulo || !this.contenido) {
      SwalService.error('Título y Contenido son obligatorios');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea crear este artículo del blog?');
    if (!confirmed) return;

    try {
      await this.createBlogUseCase.execute({
        titulo: this.titulo,
        contenido: this.contenido,
        resumen: this.resumen,
        imagenPortada: this.imagenPortada,
        autor: this.autor
      });
      SwalService.success('Artículo creado con éxito');
      this.resetForm();
      await this.router.navigate(['/dashboard/blog']);
    } catch (error) {
      console.error('Error al crear artículo:', error);
      SwalService.error('No se pudo crear el artículo del blog');
    }
  }

  private resetForm() {
    this.titulo = '';
    this.resumen = '';
    this.contenido = '';
    this.imagenPortada = '';
    this.autor = '';
  }
}
