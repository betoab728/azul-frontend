import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  OnInit, signal, computed } from '@angular/core';
import {SolicitudGeneradorService} from 'src/app/infrastructure/services/request-generator-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { DetalleSolicitudService } from 'src/app/infrastructure/services/request-detail.service';


@Component({
  selector: 'app-request-generator',
  imports: [CommonModule],
  templateUrl: './request-generator.html',
  styleUrl: './request-generator.css'
})
export class RequestGenerator implements OnInit {
  loading = true;
  solicitudes = computed(() => this.solicitudGeneradorService.solicitudes());
 
  constructor(
    private solicitudGeneradorService: SolicitudGeneradorService,
    private detalleService: DetalleSolicitudService
  ) { }

  async ngOnInit() {
    this.loading = true;

    try {
      await this.solicitudGeneradorService.load();
    } catch (error) {
      console.error('Error al cargar solicitudes del generador:', error);
      SwalService.error('No se pudieron cargar las solicitudes del generador');
      
    } finally {
      this.loading = false;
    }

   
  }
  async recargar() {
    await this.solicitudGeneradorService.refresh();
  }

  async verDetalle(idSolicitud: string) {
    await this.detalleService.loadBySolicitud(idSolicitud);
    const detalles = this.detalleService.detalles();
    SwalService.detalleSolicitud(detalles);
  }

}
