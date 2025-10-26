import { Component,OnInit, inject  } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehiculoService } from 'src/app/infrastructure/services/vehicle-store.service';
import { VehiculoConTipo } from 'src/app/domain/entities/vehicle';
import { SwalService } from 'src/app/infrastructure/services/swal.service';



@Component({
  selector: 'app-vehicle-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './vehicle-detail.html',
  styleUrl: './vehicle-detail.css'
})
export class VehicleDetail implements OnInit  {
  private route = inject(ActivatedRoute);
  private vehiculoService = inject(VehiculoService);
  vehiculo?: VehiculoConTipo;
  loading = true;

  
  async ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID del vehículo:', id);
    if (!id) return;

    try {
      const data = await this.vehiculoService.getById(id);
      this.vehiculo = data;
    } catch (error) {
      console.error('Error al obtener el vehículo:', error);
      SwalService.error('No se pudo cargar el detalle del vehículo');
    } finally {
      this.loading = false;
    }

  }

  async abrirUrl(pdfUrl?: string | null) {
    if (pdfUrl) {
     // window.open(url, '_blank');
     try {
      // se extraer solo la parte después del dominio S3
      const fileKey = pdfUrl.replace(
        'https://azul-sostenible-documentos-2025.s3.us-east-1.amazonaws.com/',
        ''
      );
  
      const url = await this.vehiculoService.obtenerUrlDescarga(fileKey);
      console.log('URL firmada del PDF:', url);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al obtener la URL del PDF:', error);
      SwalService.error('No se pudo abrir el PDF. Intente nuevamente más tarde.');
    }
    } else {
      SwalService.error('No hay documento disponible para este archivo.');
    }
  }

}
