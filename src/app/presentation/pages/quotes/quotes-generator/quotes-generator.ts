import { Component,OnInit, inject } from '@angular/core';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { CotizacionService } from 'src/app/infrastructure/services/quote.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quotes-generator',
  imports: [CommonModule],
  templateUrl: './quotes-generator.html',
  styleUrl: './quotes-generator.css'
})
export class QuotesGenerator implements OnInit{

  private cotizacionService= inject(CotizacionService);
  private router = inject(Router);

  //signala reactivas
  cotizaciones =this.cotizacionService.cotizacionesGenerador;
  isLoaded = this.cotizacionService.isLoadedGenerador;
  loading = true;

  async ngOnInit() {
    this.loading = true;
    try {
      await this.cotizacionService.listarPorGenerador();
    } catch (error) {
      console.error('Error al cargar cotizaciones:', error);
      SwalService.error('No se pudieron cargar las cotizaciones');
    } finally {
      this.loading = false;
    }
  }
  async abrirPDF(pdfUrl: string) {
    try {
      // se extraer solo la parte después del dominio S3
      const fileKey = pdfUrl.replace(
        'https://azul-sostenible-documentos-2025.s3.us-east-1.amazonaws.com/',
        ''
      );
  
      const url = await this.cotizacionService.obtenerUrlDescarga(fileKey);
      console.log('URL firmada del PDF:', url);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al obtener la URL del PDF:', error);
      SwalService.error('No se pudo abrir el PDF. Intente nuevamente más tarde.');
    }
  }

  //GenerarOrden
  generarOrden(cotizacionId: string) {
    console.log('Generar orden para la cotización con ID:', cotizacionId);
    //navgate a /dashboard/ordenes/agregar/:idCotizacion
    this.router.navigate(['/dashboard/ordenes/agregar', cotizacionId]);

  }

  irADocumentos() {
    //navgate a /dashboard/documentos/:idCotizacion
    this.router.navigate(['/dashboard/documentos']);
  }

}
