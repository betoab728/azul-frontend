import { Component, OnInit } from '@angular/core';
import { Classification } from '../../../domain/entities/classification.entity';
import { GetAllClassificationsUseCase } from '../../../application/use-cases/classifications/get-all-classifications.use-case';
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
    private getAllClassifications: GetAllClassificationsUseCase,
    private createClassificationUseCase: CreateClassificationUseCase
  ) {}
  async ngOnInit() {
    await this.loadClassifications();
  }

  async onCreateClassification() {
    const nombre = await SwalService.inputPrompt('Nueva Clasificación', 'Ej. Orgánicos');
    if (!nombre) return;

    try {
      await this.createClassificationUseCase.execute({ nombre });
      await this.loadClassifications();
      SwalService.success('Clasificación creada correctamente');
    } catch (error) {
      console.error(error);
      SwalService.error('Hubo un error al registrar la clasificación');
    }
  }

  private async loadClassifications() {
    this.loading = true;
    this.classifications = await this.getAllClassifications.execute();
    this.loading = false;
  }
}
