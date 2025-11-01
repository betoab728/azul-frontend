import { Component,OnInit, inject  } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { OrdenTrasladoService } from 'src/app/infrastructure/services/orders.service';
import { OrdenDocumentos } from 'src/app/domain/entities/order.entity';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents.html'
})
export class DocumentsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private ordenService = inject(OrdenTrasladoService);
  private http = inject(HttpClient);

  Listadocumentos?: OrdenDocumentos;
  loading = true;
  idOrden!: string;

  selectedFiles: { [key: string]: File | null } = {};

  documentos = [
    { tipo: 'guia_remision', label: 'Guía de Remisión', key: 'guia_remision_url' },
    { tipo: 'factura', label: 'Factura', key: 'factura_url' },
    { tipo: 'guia_transportista', label: 'Guía Transportista', key: 'guia_transportista_url' },
    { tipo: 'informe', label: 'Informe', key: 'informe_url' },
    { tipo: 'manifiesto', label: 'Manifiesto', key: 'manifiesto_url' },
    { tipo: 'certificado', label: 'Certificado', key: 'certificado_url' },
  ];

  async ngOnInit() {
    this.idOrden = this.route.snapshot.paramMap.get('id')!;
    if (!this.idOrden) return;

    try {
      const data = await this.ordenService.getDocumentos(this.idOrden);
      this.Listadocumentos = data;
    } catch (error) {
      console.error('Error al obtener los documentos de la orden:', error);
      SwalService.error('No se pudo cargar los documentos de la orden');
    } finally {
      this.loading = false;
    }
  }

  onFileSelected(event: any, tipo: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[tipo] = file;
      // limpia el input luego de asignar
      event.target.value = '';
    }
  }

  tieneArchivo(tipo: string): boolean {
    if (!this.Listadocumentos) return false;
    const key = this.documentos.find(d => d.tipo === tipo)?.key!;
    return !!this.Listadocumentos[key as keyof OrdenDocumentos];
  }

  getNombreArchivo(tipo: string): string | null {
    if (!this.Listadocumentos) return null;
    const key = this.documentos.find(d => d.tipo === tipo)?.key!;
    const url = this.Listadocumentos[key as keyof OrdenDocumentos];
    return url ? url.split('/').pop() ?? null : null;
  }
  async guardar(tipo: string) {
    const file = this.selectedFiles[tipo];
    if (!file) {
      SwalService.error('Debe seleccionar un archivo antes de guardar.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    this.loading = true;
    try {
      await this.ordenService.subirDocumento(this.idOrden, tipo, formData);
      SwalService.success('Documento subido correctamente.');
      await this.ngOnInit(); // refresca lista actualizada
    } catch (error) {
      SwalService.error('Error al subir el documento.');
      console.error(error);
    } finally {
      this.loading = false;
      this.selectedFiles[tipo] = null; // limpia input
    }
  }

  async descargar(tipo: string) {
    const key = this.documentos.find(d => d.tipo === tipo)?.key!;
    const url = this.Listadocumentos?.[key as keyof OrdenDocumentos];
    if (!url) {
      SwalService.error('No hay archivo disponible para descargar.');
      return;
    }

    window.open(url as string, '_blank');
  }
  getUrlDocumento(docKey: string): string | null {
    if (!this.Listadocumentos) return null;
    return this.Listadocumentos[docKey as keyof OrdenDocumentos] as string | null;
  }
  abrirSelectorArchivo(tipo: string) {
    const input = document.getElementById(`fileInput-${tipo}`) as HTMLInputElement;
    input?.click();
  }

  
  async abrirPDF(pdfUrl: string) {
    try {
      // se extraer solo la parte después del dominio S3
      console.log('url de la bd: ',pdfUrl)

      const fileKey = pdfUrl.replace(
        'https://azul-sostenible-documentos-2025.s3.us-east-1.amazonaws.com/',
        ''
      );
      console.log('url limpia',fileKey)
  
      const url = await this.ordenService.obtenerUrlDescarga(fileKey);
      console.log('URL firmada del PDF:', url);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al obtener la URL del PDF:', error);
      SwalService.error('No se pudo abrir el PDF. Intente nuevamente más tarde.');
    }
  }
}
