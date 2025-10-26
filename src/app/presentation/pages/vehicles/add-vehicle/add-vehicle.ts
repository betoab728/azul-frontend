import { Component,inject,signal  } from '@angular/core';
import { VehiculoService } from 'src/app/infrastructure/services/vehicle-store.service';
import { TipoVehiculoService } from 'src/app/infrastructure/services/vehicle-type.store.service';
import { VehiculoCreate } from 'src/app/domain/entities/vehicle';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-add-vehicle',
  imports: [FormsModule ,NgSelectModule,CommonModule],
  templateUrl: './add-vehicle.html',
  styleUrl: './add-vehicle.css'
})
export class AddVehicle {

    // Inyección de dependencias moderna con `inject`
    private vehiculoService = inject(VehiculoService);
    private tipoVehiculoService = inject(TipoVehiculoService);
    private router = inject(Router);

  placa = '';
  marca = '';
  modelo = '';
  anio_fabricacion?: number;
  capacidad_toneladas?: number;
  estado = 'activo';
  observaciones = '';
  id_tipo_vehiculo = '';
  // Archivos seleccionados
  tarjeta_propiedad: File | null = null;
  certificado_itv: File | null = null;
  soat: File | null = null;
  tarjeta_circulacion: File | null = null;

  

   // Signal para tipos de vehículo (reactivo)
   tiposVehiculo = this.tipoVehiculoService.tipos;

   loading = signal(false);

   async ngOnInit() {
    this.loading.set(true);
    try {
      await this.tipoVehiculoService.load(); // cargamos tipos si no están cargados
    } catch (error) {
      console.error('Error al cargar tipos de vehículo:', error);
      SwalService.error('No se pudieron cargar los tipos de vehículo');
    } finally {
      this.loading.set(false);
    }
  }
  onFileSelected(event: any, tipo: string) {
    const file = event.target.files[0];
    if (!file) return;
  
    switch (tipo) {
      case 'tarjeta_propiedad':
        this.tarjeta_propiedad = file;
        break;
      case 'certificado_itv':
        this.certificado_itv = file;
        break;
      case 'soat':
        this.soat = file;
        break;
      case 'tarjeta_circulacion':
        this.tarjeta_circulacion = file;
        break;
    }
  }

  async onSubmit() {
    if (!this.placa || !this.marca || !this.id_tipo_vehiculo) {
      SwalService.error('Complete los campos obligatorios: placa, marca y tipo de vehículo.');
      return;
    }

    const confirmado = await SwalService.confirm('¿Desea registrar este vehículo?');
    if (!confirmado) return;

    const vehiculo: VehiculoCreate = {
      placa: this.placa,
      marca: this.marca,
      modelo: this.modelo,
      anio_fabricacion: this.anio_fabricacion,
      capacidad_toneladas: this.capacidad_toneladas,
      estado: this.estado,
      observaciones: this.observaciones,
      id_tipo_vehiculo: this.id_tipo_vehiculo,
      tarjeta_propiedad: this.tarjeta_propiedad || undefined,
      certificado_itv: this.certificado_itv || undefined,
      soat: this.soat || undefined,
      tarjeta_circulacion: this.tarjeta_circulacion || undefined,
    };

    try {
      this.loading.set(true);
      await this.vehiculoService.create(vehiculo);
      SwalService.success('Vehículo registrado con éxito');
      await this.router.navigate(['/dashboard/vehiculos']);
    } catch (error) {
      console.error('Error al registrar vehículo:', error);
      SwalService.error('No se pudo registrar el vehículo');
    } finally {
      this.loading.set(false);
    }
  }
 


}
