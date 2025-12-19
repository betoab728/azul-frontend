import { Component , Input, OnInit, signal } from '@angular/core';
import { OrdenTrasladoService } from 'src/app/infrastructure/services/orders.service';
import { OrdenTimelineItem }  from 'src/app/domain/entities/order.entity';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-timeline',
  standalone: true,  
  imports: [CommonModule],
  templateUrl: './order-timeline.html',
  styleUrl: './order-timeline.css'
})
export class OrderTimeline  implements OnInit {

  @Input({ required: true }) idOrden!: string;
  timeline = signal<OrdenTimelineItem[]>([]);
  loading = signal(true);

  @Output() loaded = new EventEmitter<OrdenTimelineItem[]>();



  constructor(private ordenService: OrdenTrasladoService) {}

  async ngOnInit(){
    try {
      const data = await this.ordenService.obtenerTimeline(this.idOrden);
      const sorted = [...data].sort(
        (a, b) =>
          new Date(a.fecha_hora).getTime() -
          new Date(b.fecha_hora).getTime()
      );

      this.timeline.set(sorted);
      this.loaded.emit(sorted)
    } catch (error) {
      console.error('Error cargando timeline', error);
      SwalService.error('No se pudo cargar el timeline de la orden');
      this.timeline.set([]);
      this.loaded.emit([]); //
    } finally {
      this.loading.set(false);
    }
  }

}
