//implementacion de la interfaz de repositorio de roles
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { CreateRoleDto, UpdateRoleDto, RoleReadDto } from '../../application/dto/role.dto';
import { endpoints } from '../config/endpoints';

@Injectable()
export class RoleApiRepository implements RoleRepository {
  private url = endpoints.roles; // URL del endpoint de roles

  constructor(private http: HttpClient) {}

  async create(dto: CreateRoleDto): Promise<RoleReadDto> {
    return await firstValueFrom(this.http.post<RoleReadDto>(this.url, dto));
  }

  async update(id: number, dto: UpdateRoleDto): Promise<RoleReadDto> {
    return await firstValueFrom(this.http.put<RoleReadDto>(`${this.url}/${id}`, dto));
  }

  async delete(id: number): Promise<void> {
    return await firstValueFrom(this.http.delete<void>(`${this.url}/${id}`));
  }

  async getById(id: number): Promise<RoleReadDto | null> {
    return await firstValueFrom(this.http.get<RoleReadDto>(`${this.url}/${id}`));
  }

  async getAll(): Promise<RoleReadDto[]> {
    return await firstValueFrom(this.http.get<RoleReadDto[]>(this.url));
  }
}