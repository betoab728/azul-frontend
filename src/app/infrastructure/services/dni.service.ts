import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface DniResponse {
    estado: boolean;
    mensaje: string;
    resultado?: {
      id: string;
      nombres: string;
      apellido_paterno: string;
      apellido_materno: string;
      nombre_completo: string;
      codigo_verificacion: string;
    };
  }

  
@Injectable({ providedIn: 'root' })
export class DniService {
  private apiUrl = 'https://api.perudevs.com/api/v1/dni/simple';
  private apiKey = 'cGVydWRldnMucHJvZHVjdGlvbi5maXRjb2RlcnMuNjg0Y2RjYmU5ZmE0MTczZjYxMzIwYzM0';

  constructor(private http: HttpClient) {}

  async consultarDni(documento: string): Promise<DniResponse> {
    const url = `${this.apiUrl}?document=${documento}&key=${this.apiKey}`;
    return await firstValueFrom(this.http.get<DniResponse>(url));
  }
}