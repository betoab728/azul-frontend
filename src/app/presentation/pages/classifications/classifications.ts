import { Component, OnInit } from '@angular/core';
import { ClassificationStoreService } from 'src/app/infrastructure/services/clasification-store.service';
import { Classification } from '../../../domain/entities/classification.entity';
import { CreateClassificationUseCase } from '../../../application/use-cases/classifications/create-classification.use-case';
import { CommonModule } from '@angular/common';
//swalert2
import {SwalService} from '../../../infrastructure/services/swal.service.js';

@Component({
  selector: 'app-classifications',
  imports: [CommonModule],
  templateUrl: './classifications.html',
  styleUrl: './classifications.css'
})
export class Classifications implements OnInit  {
  classifications: Classification[] = [];
  loading = true;

  constructor(
    private classificationStoreService: ClassificationStoreService,
    private createClassificationUseCase: CreateClassificationUseCase
  ) {}
  async ngOnInit() {
  
    this.loading = true;
    try {
      await this.classificationStoreService.load();
      this.classifications = this.classificationStoreService.classifications();
    } catch (error) {
      console.error('Error al obtener las clasificaciones:', error);
      SwalService.error('No se pudieron cargar las clasificaciones');
    } finally {
      this.loading = false;
    }
  }

  async onCreateClassification() {
    const nombre = await SwalService.inputPrompt('Nueva Clasificación', 'Ej. Orgánicos');
    if (!nombre) return;

    try {
      await this.createClassificationUseCase.execute({ nombre });
      await this.classificationStoreService.refresh();
      SwalService.success('Clasificación creada correctamente');
    } catch (error) {
      console.error(error);
      SwalService.error('Hubo un error al registrar la clasificación');
    }
  }


}
