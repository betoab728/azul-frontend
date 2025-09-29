import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudCotizacionList } from 'src/app/domain/entities/request.entity';
import { SolicitudStoreService } from 'src/app/infrastructure/services/request-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { EstadoSolicitudService } from 'src/app/infrastructure/services/status.service';
import { UpdateSolicitudService } from 'src/app/infrastructure/services/update-request.service';
import { DetalleSolicitudService } from 'src/app/infrastructure/services/request-detail.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request.html',
  styleUrl: './request.css'
})
export class Request implements OnInit {
  solicitudes: SolicitudCotizacionList[] = [];
  loading = true;

  constructor(
    private solicitudStoreService: SolicitudStoreService,
    private estadoService: EstadoSolicitudService,
    private solicitudService: UpdateSolicitudService,
    private detalleService: DetalleSolicitudService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.solicitudStoreService.load();
      this.solicitudes = this.solicitudStoreService.solicitudes();
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      SwalService.error('No se pudieron cargar las solicitudes');
    } finally {
      this.loading = false;
    }
  }
  async onCreateSolicitud() {
    await this.router.navigate(['/dashboard/solicitudes/agregar']);
  }
  //update
  async onUpdateEstado (solicitud: SolicitudCotizacionList) {


  }

  async actualizarEstado(solicitudId: string) {
    // 1. Cargar estados si aún no están cargados
    if (this.estadoService.estados().length === 0) {
      await this.estadoService.load();
    }

    // 2. Mostrar selector en SweetAlert
    const estados = this.estadoService.estados();
    const inputOptions: Record<string, string> = {};
    estados.forEach((e) => {
      inputOptions[e.id] = e.nombre;
    });

    const { value: estadoId } = await SwalService.select(
      'Selecciona un nuevo estado',
      inputOptions
    );

    if (!estadoId) return;

    // 3. Confirmar cambio
    const confirmed = await SwalService.confirm('¿Desea actualizar el estado de esta solicitud?');
    if (!confirmed) return;

    try {
      this.loading = true;
      await this.solicitudService.actualizarEstado(solicitudId, estadoId);
      // 4. Recargar lista de solicitudes
      await this.solicitudStoreService.refresh();
      this.solicitudes = this.solicitudStoreService.solicitudes();
      SwalService.success('Estado actualizado con éxito');
    } catch (err) {
      console.error(err);
      SwalService.error('No se pudo actualizar el estado ');
    } finally {
      this.loading = false;
    }

  }

  async verDetalle(idSolicitud: string) {
    await this.detalleService.loadBySolicitud(idSolicitud);
    const detalles = this.detalleService.detalles();
    SwalService.detalleSolicitud(detalles);
  }



}
