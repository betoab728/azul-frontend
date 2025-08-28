//implementacion del repositorio de usuarios que utiliza la API
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto, UpdateUserDto, UserReadDto, UserWithRoleDto } from '../../application/dto/user.dto';
import { endpoints } from 'src/app/infrastructure/config/endpoints';

@Injectable()
export class UserApiRepository implements UserRepository {
  private url = endpoints.users; // URL del endpoint de usuarios
    private urlWithRoles = endpoints.userswithRoles; // URL del endpoint de usuarios con roles

  constructor(private http: HttpClient) {}

  async create(dto: CreateUserDto): Promise<UserReadDto> {
    return await firstValueFrom(this.http.post<UserReadDto>(this.url, dto));
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserReadDto> {
    return await firstValueFrom(this.http.put<UserReadDto>(`${this.url}/${id}`, dto));
  }

  async getById(id: string): Promise<UserReadDto | null> {
    return await firstValueFrom(this.http.get<UserReadDto>(`${this.url}/${id}`));
  }

  async getAll(): Promise<UserReadDto[]> {
    return await firstValueFrom(this.http.get<UserReadDto[]>(this.url));
  }

  async getAllWithRoles(): Promise<UserWithRoleDto[]> {

    console.log("Fetching users with roles from:", this.urlWithRoles);
    
    return await firstValueFrom(this.http.get<UserWithRoleDto[]>(`${this.urlWithRoles}`));
  }
}