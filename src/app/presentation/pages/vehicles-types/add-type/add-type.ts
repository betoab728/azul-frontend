import { Component } from '@angular/core';
import { TipoVehiculoService } from 'src/app/infrastructure/services/vehicle-type.store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { TipoVehiculoCreate } from 'src/app/domain/entities/vehicle-type.entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-type',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-type.html',
  styleUrl: './add-type.css'
})
export class AddType {

  nombre = '';
  descripcion = '';

  constructor(
    private tipoVehiculoService: TipoVehiculoService,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.nombre || !this.descripcion) {
      SwalService.error('Todos los campos son obligatorios');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea registrar este tipo de vehículo?');
    if (!confirmed) return;

    const tipo: TipoVehiculoCreate = {
      nombre: this.nombre,
      descripcion: this.descripcion
    };
    try {
      await this.tipoVehiculoService.create(tipo);
      SwalService.success('Tipo de vehículo creado con éxito');
      this.resetForm();

      // Navegamos al listado
      await this.router.navigate(['/dashboard/tipos-vehiculo']);
    } catch (error) {
      console.error('Error al crear tipo de vehículo:', error);
      SwalService.error('No se pudo crear el tipo de vehículo');
    }

  }
  resetForm() {
    this.nombre = '';
    this.descripcion = '';
  }

}
