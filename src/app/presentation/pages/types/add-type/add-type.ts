import { Component } from '@angular/core';
import { Classification } from 'src/app/domain/entities/classification.entity';
import { GetAllClassificationsUseCase } from 'src/app/application/use-cases/classifications/get-all-classifications.use-case';
import { CreateTipoResiduoUseCase } from 'src/app/application/use-cases/types/create-type.use-case';
import { TipoResiduoStoreService } from 'src/app/infrastructure/services/type-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-type',
  imports: [FormsModule,CommonModule,NgSelectModule],
  templateUrl: './add-type.html',
  styleUrl: './add-type.css'
})
export class AddType {

  nombre = '';
  descripcion = '';
  idClasificacion = '';
  clasificaciones: Classification[] = [];

  constructor(
    private getAllClassificationsUseCase: GetAllClassificationsUseCase,
    private createTipoResiduoUseCase: CreateTipoResiduoUseCase,
    private tipoResiduoStoreService: TipoResiduoStoreService,
    private router: Router
  ) {}

  
  async ngOnInit() {
    this.clasificaciones = await this.getAllClassificationsUseCase.execute();
  }
  async onSubmit() {
    if (!this.nombre || !this.descripcion || !this.idClasificacion) {
      SwalService.error('Todos los campos son obligatorios');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea registrar este tipo de residuo?');
    if (!confirmed) return;

    const tipoResiduo = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      id_clasificacion: this.idClasificacion
    };

    try {
      await this.createTipoResiduoUseCase.execute(tipoResiduo);
      await this.tipoResiduoStoreService.refresh();

      SwalService.success('Tipo de residuo creado con éxito');
      this.resetForm();
      await this.router.navigate(['/dashboard/tipos-residuo']);
    } catch (error) {
      console.error('Error al crear tipo de residuo:', error);
      SwalService.error('No se pudo crear el tipo de residuo');
    }
  }

  private resetForm() {
    this.nombre = '';
    this.descripcion = '';
    this.idClasificacion = '';
  }

}
