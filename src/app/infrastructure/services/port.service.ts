// src/app/infrastructure/services/puerto.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endpoints } from '../config/endpoints';

export interface Puerto {
  id: string;
  nombre: string;
  ubicacion: string;
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class PuertoService {
  private url = endpoints.ports;

  // señal reactiva con la lista
  puertos = signal<Puerto[]>([]);

  constructor(private http: HttpClient) {}

  async load() {
    console.log('Cargando puertos desde', this.url);
    const data = await this.http.get<Puerto[]>(this.url).toPromise();
    this.puertos.set(data ?? []);
  }

  async create(nombre: string, ubicacion: string) {
    const nuevo = await this.http.post<Puerto>(this.url, { nombre, ubicacion }).toPromise();
    if (nuevo) {
      this.puertos.update((list) => [...list, nuevo]);
    }
    return nuevo;
  }
}
