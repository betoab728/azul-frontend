import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

import { TipoEmbarcacion } from 'src/app/domain/entities/boat-type.entity';
import { GeneradorResiduoDetalle } from 'src/app/domain/entities/generator.entity';
import { GetAllTiposEmbarcacionUseCase } from 'src/app/application/use-cases/boats-types/boat-type.use-case.js';
import { GetAllGeneradoresResiduosUseCase } from 'src/app/application/use-cases/generator/get-all-generator.use-case';
import { CreateEmbarcacionUseCase } from 'src/app/application/use-cases/boats/create-boat.use-case';

@Component({
  selector: 'app-add-embarcacion',
  templateUrl: './add-boat.html',
  styleUrls: ['./add-boat.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
})
export class AddBoat {
  // Campos del formulario
  nombre = '';
  matricula = '';
  id_tipo_embarcacion = '';
  capacidad_carga: number | null = null;
  capitan = '';
  observaciones = '';
  id_generador = '';

  // Para los combos
  tiposEmbarcacion: TipoEmbarcacion[] = [];
  generadores: GeneradorResiduoDetalle[] = [];

  constructor(
    private getAllTiposEmbarcacion: GetAllTiposEmbarcacionUseCase,
    private getAllGeneradores: GetAllGeneradoresResiduosUseCase,
    private createEmbarcacion: CreateEmbarcacionUseCase,
    private router: Router
  ) {}

  async ngOnInit() {
    this.tiposEmbarcacion = await this.getAllTiposEmbarcacion.execute();
    this.generadores = await this.getAllGeneradores.execute();
  }

  async onSubmit() {
    if (
      !this.nombre ||
      !this.matricula ||
      !this.id_tipo_embarcacion ||
      !this.capacidad_carga ||
      !this.capitan ||
      !this.id_generador
    ) {
      SwalService.error('Todos los campos obligatorios deben completarse');
      return;
    }

    const confirmed = await SwalService.confirm(
      '¿Desea registrar esta embarcación?'
    );
    if (!confirmed) return;

    const entity = {
      nombre: this.nombre,
      matricula: this.matricula,
      id_tipo_embarcacion: this.id_tipo_embarcacion,
      capacidad_carga: this.capacidad_carga!,
      capitan: this.capitan,
      observaciones: this.observaciones,
      id_generador: this.id_generador,
    };

    try {
      await this.createEmbarcacion.execute(entity);
      SwalService.success('Embarcación creada con éxito');
      this.resetForm();
      await this.router.navigate(['/dashboard/embarcaciones']);
    } catch (error) {
      console.error('Error al crear embarcación:', error);
      SwalService.error('No se pudo crear la embarcación');
    }
  }

  private resetForm() {
    this.nombre = '';
    this.matricula = '';
    this.id_tipo_embarcacion = '';
    this.capacidad_carga = null;
    this.capitan = '';
    this.observaciones = '';
    this.id_generador = '';
  }
}
