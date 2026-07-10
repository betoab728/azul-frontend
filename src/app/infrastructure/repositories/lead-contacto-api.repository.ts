import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { LeadContactoRepository } from '../../domain/repositories/lead-contacto.repository';
import { LeadContactoResponseDto } from '../../application/dto/lead-contacto-response.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class LeadContactoApiRepository implements LeadContactoRepository {
  private url = endpoints.leadsContacto;

  constructor(private http: HttpClient) {}

  async getAll(): Promise<LeadContactoResponseDto[]> {
    return await firstValueFrom(this.http.get<LeadContactoResponseDto[]>(this.url));
  }
}
