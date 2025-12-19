import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OrdenTimelineItem } from 'src/app/domain/entities/order.entity';

@Component({
  selector: 'app-order-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-progress.html',
  styleUrl: './order-progress.css'
})
export class OrderProgress {
  
  @Input({ required: true }) timeline: OrdenTimelineItem[] = [];

  estados = [
    'Solicitud recibida',
    'Pendiente de asignación',
    'Vehículo en camino a planta',
    'En planta',
    'Finalizado'
  ];

  estadoActual(): string | null {
    return this.timeline.at(-1)?.estado ?? null;
  }

  estaActivo(estado: string): boolean {
    const indexActual = this.estados.indexOf(this.estadoActual() ?? '');
    return this.estados.indexOf(estado) <= indexActual;
  }

}
