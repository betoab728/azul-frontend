import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuntoTrazabilidad } from 'src/app/domain/entities/traceability.entity';

import { TraceabilityService } from 'src/app/infrastructure/services/traceability.service';

@Component({
  selector: 'app-traceability',
  standalone: true,
  imports: [CommonModule, FormsModule, GoogleMapsModule],
  templateUrl: './traceability.html',
  styleUrl: './traceability.css',
})
export class Traceability implements OnInit {

  private route = inject(ActivatedRoute);

  ordenId = '';
  puntos: PuntoTrazabilidad[] = [];

  async ngOnInit() {
  
    this.ordenId = this.route.snapshot.paramMap.get('id') || '';
   
    this.puntos = await this.traceService.getByOrden(this.ordenId);
    console.log('Puntos de trazabilidad obtenidos:', this.puntos);

    if (!this.puntos.length) return;

    this.path = this.puntos.map(p => ({
      lat: p.latitud,
      lng: p.longitud
    }));

    this.markerPosition = this.path.at(-1)!;
    this.center = this.markerPosition;
  }

  path: google.maps.LatLngLiteral[] = [];
  markerPosition: google.maps.LatLngLiteral | null = null;

  center: google.maps.LatLngLiteral = { lat: -5.1945, lng: -80.6328 };
  zoom = 14;

  constructor(private traceService: TraceabilityService) {}

  async buscar() {
    this.puntos = await this.traceService.getByOrden(this.ordenId);
    console.log('Puntos de trazabilidad obtenidos:', this.puntos);

    if (!this.puntos.length) return;

    this.path = this.puntos.map(p => ({
      lat: p.latitud,
      lng: p.longitud
    }));

    this.markerPosition = this.path.at(-1)!;
    this.center = this.markerPosition;
  }
}