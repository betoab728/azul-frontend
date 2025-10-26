import { Component, OnInit, computed } from '@angular/core';
import { CotizacionSignalService } from 'src/app/infrastructure/services/quote-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { CommonModule } from '@angular/common';
import { CotizacionList } from 'src/app/domain/entities/quote.entity';
import { CotizacionService } from 'src/app/infrastructure/services/quote.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  imports: [ CommonModule ],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css'
})
export class Quotes  implements OnInit {
  cotizaciones : CotizacionList[] = [];
  loading = true;


  constructor(private signalService: CotizacionSignalService
    , private cotizacionService: CotizacionService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.signalService.load();
      this.cotizaciones = this.signalService.cotizaciones();
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
