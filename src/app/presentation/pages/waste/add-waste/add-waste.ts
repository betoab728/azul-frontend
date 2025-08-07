import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Router } from '@angular/router';

import { TipoResiduoWithClasificacion } from 'src/app/domain/entities/types.entity';
import { Unit } from 'src/app/domain/entities/unit.entity';
import { CreateRegistroResiduoDto } from 'src/app/application/dto/waste.dto';

import { GetAllTiposWithClasificacionUseCase } from 'src/app/application/use-cases/types/get-all-types.use-case';
import { GetAllUnitsUseCase } from 'src/app/application/use-cases/units/get-all-units.use-case';
import { CreateRegistroResiduoUseCase } from 'src/app/application/use-cases/wastes/create-waste.use-case.js';
import { RegistroResiduo } from 'src/app/domain/entities/waste.entity';

import { RegistroResiduoStoreService } from 'src/app/infrastructure/services/waste-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-create-waste',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  templateUrl: './add-waste.html',
  styleUrl: './add-waste.css',
})
export class AddWaste {
  nombreResiduo = '';
  idTipoResiduo = '';
  idUnidad = '';
  observaciones = '';

  tiposResiduo: TipoResiduoWithClasificacion[] = [];
  unidades: Unit[] = [];

  constructor(
    private getAllTiposUseCase: GetAllTiposWithClasificacionUseCase,
    private getAllUnitsUseCase: GetAllUnitsUseCase,
    private createRegistroResiduoUseCase: CreateRegistroResiduoUseCase,
    private registroResiduoStoreService: RegistroResiduoStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.tiposResiduo = await this.getAllTiposUseCase.execute();
    this.unidades = await this.getAllUnitsUseCase.execute();
  }

  async onSubmit() {
    if (!this.nombreResiduo || !this.idTipoResiduo || !this.idUnidad) {
      SwalService.error('Todos los campos requeridos deben ser completados.');
      return;
    }

    const confirm = await SwalService.confirm('¿Desea registrar este residuo?');
    if (!confirm) return;


    const nuevoRegistro: RegistroResiduo ={
      nombreResiduo: this.nombreResiduo,
      idTipoResiduo: this.idTipoResiduo,
      idUnidad: this.idUnidad,
      observaciones: this.observaciones || undefined,
    }

    try {
      await this.createRegistroResiduoUseCase.execute(nuevoRegistro);
      await this.registroResiduoStoreService.refresh();
      SwalService.success('Residuo registrado con éxito');
      this.resetForm();
      await this.router.navigate(['/dashboard/registro-residuos']);
    } catch (error) {
      console.error('Error al crear el registro de residuo:', error);
      SwalService.error('No se pudo registrar el residuo');
    }
  }

  private resetForm() {
    this.nombreResiduo = '';
    this.idTipoResiduo = '';
    this.idUnidad = '';
    this.observaciones = '';
  }
}
