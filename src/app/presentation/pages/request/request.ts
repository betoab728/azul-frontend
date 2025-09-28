import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudCotizacionList } from 'src/app/domain/entities/request.entity';
import { SolicitudStoreService } from 'src/app/infrastructure/services/request-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

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

}
