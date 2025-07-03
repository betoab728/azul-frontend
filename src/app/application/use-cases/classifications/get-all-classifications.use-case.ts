//caso de uso para obtener todas las clasificaciones

import { Injectable } from '@angular/core';
import { ClassificationRepository } from '../../../domain/repositories/classification.repository';
import { Classification } from '../../../domain/entities/classification.entity';

@Injectable({
  providedIn: 'root'
})

export class GetAllClassificationsUseCase {
  constructor(private classificationRepository: ClassificationRepository) {}

  async execute(): Promise<Classification[]> {
    return await this.classificationRepository.getAll();
  }
}