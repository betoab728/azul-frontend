import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.html'
})
export class DocumentsComponent {
  documentosRequeridos = [
    { key: 'guia_remision', label: 'Guía de Remisión' },
    { key: 'guia_transportista', label: 'Guía del Transportista' },
    { key: 'manifiesto', label: 'Manifiesto' },
    { key: 'informe', label: 'Informe' },
    { key: 'certificado', label: 'Certificado' },
    { key: 'factura', label: 'Factura' }
  ];

  selectedFiles: { [key: string]: File | null } = {};
  uploadedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  onFileSelected(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[key] = file;
    }
  }

  async onSubmit() {
    const formData = new FormData();
    for (const key in this.selectedFiles) {
      if (this.selectedFiles[key]) {
        formData.append(key, this.selectedFiles[key]!);
      }
    }

    try {
      const response = await this.http
        .post('http://localhost:8000/documentos/upload', formData)
        .toPromise();

      this.uploadedFiles = Object.values(this.selectedFiles).filter(
        (file): file is File => !!file
      );

      SwalService.success('Documentos subidos correctamente');
    } catch (error) {
      console.error('Error al subir documentos:', error);
      SwalService.error('No se pudieron subir los documentos');
    }
  }
}
