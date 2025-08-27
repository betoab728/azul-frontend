import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface RucResponse {
    estado: boolean;
    mensaje: string;
    resultado: RucResultado;
  }
  
  export interface RucResultado {
    razon_social: string;
    condicion: string;
    nombre_comercial: string;
    tipo: string;
    fecha_inscripcion: string; // se puede convertir luego a Date
    estado: string;
    direccion: string;
    sistema_emision: string;
    actividad_exterior: string;
    sistema_contabilidad: string;
    fecha_emision_electronica: string;
    fecha_ple: string;
    oficio: string | null;
    actividades_economicas: string[];
    comprobante_pago: string[];
    sistema_emision_electronica: string[];
    padrones: string[];
    departamento: string;
    provincia: string;
    distrito: string;
    representantes_legales: string | null;
    id: string;
  }

  @Injectable({ providedIn: 'root' })
export class RucService {
  private apiUrl = 'https://api.perudevs.com/api/v1/ruc';
  private apiKey = 'cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjg0Y2RjYmU5ZmE0MTczZjYxMzIwYzM0';

  constructor(private http: HttpClient) {}

  async consultarRuc(ruc: string): Promise<RucResponse> {
    const url = `${this.apiUrl}?document=${ruc}&key=${this.apiKey}`;
    return await firstValueFrom(this.http.get<RucResponse>(url));
  }
}