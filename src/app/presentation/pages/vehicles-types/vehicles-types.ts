import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoVehiculoService } from 'src/app/infrastructure/services/vehicle-type.store.service';
import { TipoVehiculoResponse } from 'src/app/domain/entities/vehicle-type.entity';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { inject } from '@angular/core';

@Component({
  selector: 'app-vehicles-types',
  imports: [CommonModule],
  templateUrl: './vehicles-types.html',
  styleUrl: './vehicles-types.css'
})
export class VehiclesTypes implements OnInit {

  //  Se puede usar directamente porque `inject()` se resuelve antes de la inicialización
  private tipoVehiculoService = inject(TipoVehiculoService);
  private router = inject(Router);

  // Signal reactivo
  tiposVehiculo = this.tipoVehiculoService.tipos;

  loading = true;

  async ngOnInit() {
    this.loading = true;
    try {
      await this.tipoVehiculoService.load();
    } catch (error) {
      console.error('Error al cargar tipos de vehículo:', error);
      SwalService.error('No se pudieron cargar los tipos de vehículo');
    } finally {
      this.loading = false;
    }
  }

  async onCreateTipoVehiculo() {
    await this.router.navigate(['/dashboard/tipos-vehiculo/agregar']);
  }
}