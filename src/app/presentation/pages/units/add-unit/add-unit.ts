import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { CreateUnitUseCase } from 'src/app/application/use-cases/units/create-unit.use-case';
import { Unit } from 'src/app/domain/entities/unit.entity';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.html',
  styleUrls: ['./add-unit.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddUnit {
  codigo = '';
  nombre = '';
  descripcion = '';

  constructor(
    private createUnitUseCase: CreateUnitUseCase,
    private router: Router
  ) {}

  async onSubmit() {
    if (!this.codigo || !this.nombre || !this.descripcion) {
      SwalService.error('Todos los campos son obligatorios');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea registrar esta unidad de medida?');
    if (!confirmed) return;

    const unit: Unit = {
    
      codigo: this.codigo,
      nombre: this.nombre,
      descripcion: this.descripcion
    };

    try {
      await this.createUnitUseCase.execute(unit);
      SwalService.success('Unidad de medida creada con éxito');
      this.resetForm();
      await this.router.navigate(['/dashboard/unidades-medida']);
    } catch (error) {
      console.error('Error al crear unidad:', error);
      SwalService.error('No se pudo crear la unidad de medida');
    }
  }

  private resetForm() {
    this.codigo = '';
    this.nombre = '';
    this.descripcion = '';
  }
}
