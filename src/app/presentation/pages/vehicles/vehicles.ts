import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoService, } from 'src/app/infrastructure/services/vehicle-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css'
})
export class Vehicles implements OnInit {
  private vehiculoService = inject(VehiculoService);
  private router = inject(Router);

  // Signal reactivo
  vehiculos = this.vehiculoService.vehiculos;

  loading = true;

  async ngOnInit() {
    this.loading = true;
    try {
      await this.vehiculoService.load();
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
      SwalService.error('No se pudieron cargar los vehículos');
    } finally {
      this.loading = false;
    }
  }

  async onCreateVehicle() {
    await this.router.navigate(['/dashboard/vehiculos/agregar']);
  }

  async verDetalle(id: string) {
    await this.router.navigate([`/dashboard/vehiculos/${id}/detalle`]);
  }

}