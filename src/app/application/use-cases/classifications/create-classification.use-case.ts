// crear una clasificación
import { Injectable } from '@angular/core';
import { ClassificationRepository } from '../../../domain/repositories/classification.repository';
import { Classification } from '../../../domain/entities/classification.entity';
import { ClassificationRequestDto } from '../../../application/dto/classification-request.dto'

@Injectable({
  providedIn: 'root'
})
export class CreateClassificationUseCase {
  constructor(private classificationRepository: ClassificationRepository) {}

  async execute(classificationData: ClassificationRequestDto): Promise<Classification> {
    // Validar los datos de entrada si es necesario
    if (!classificationData.nombre) {
      throw new Error('El nombre de la clasificación es obligatorio');
    }

    // Crear la clasificación utilizando el repositorio
    return await this.classificationRepository.create(classificationData);
  }
}