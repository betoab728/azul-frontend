import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core'; 
import { OrdenTrasladoService } from 'src/app/infrastructure/services/orders.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-generator',
  imports: [],
  templateUrl: './orders-generator.html',
  styleUrl: './orders-generator.css'
})
export class OrdersGenerator  implements OnInit {

  private ordenService = inject(OrdenTrasladoService);
  private router = inject(Router);

    // Signals reactivas
    ordenes = this.ordenService.ordenesGeneradorList;
    isLoaded = this.ordenService.isGeneradorLoaded;
  
    loading = true;

    async ngOnInit() {
      this.loading = true;
      try {
        await this.ordenService.listarOrdenesPorGenerador();
      } catch (error) {
        console.error('Error al cargar órdenes:', error);
        SwalService.error('No se pudieron cargar las órdenes de traslado');
      } finally {
        this.loading = false;
      }
    }

    async recargar() {
      this.loading = true;
      try {
        await this.ordenService.reloadGenerador();
      } catch (error) {
        SwalService.error('Error al recargar las órdenes');
      } finally {
        this.loading = false;
      }
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
  
    async irADocumentos(id: string) {
      //navgate a /dashboard/documentos
      await  this.router.navigate([`/dashboard/documentos/${id}`]);
    }


}
