import { Injectable } from '@angular/core';
import { LeadContactoRepository } from '../../../domain/repositories/lead-contacto.repository';
import { LeadContacto } from '../../../domain/entities/lead-contacto.entity';
import { LeadContactoResponseDto } from '../../dto/lead-contacto-response.dto';

@Injectable({
  providedIn: 'root'
})
export class GetLeadsContactoUseCase {
  constructor(private leadContactoRepository: LeadContactoRepository) {}

  async execute(): Promise<LeadContacto[]> {
    const dtos = await this.leadContactoRepository.getAll();
    return dtos.map(dto => this.mapToEntity(dto));
  }

  private mapToEntity(dto: LeadContactoResponseDto): LeadContacto {
    return {
      id: dto.id,
      nombreCompleto: dto.nombre_completo,
      empresa: dto.empresa,
      sector: dto.sector,
      desafioAmbiental: dto.desafio_ambiental,
      correo: dto.correo,
      telefono: dto.telefono,
      origen: dto.origen,
      estado: dto.estado,
      createdAt: dto.created_at,
      updatedAt: dto.updated_at
    };
  }
}
