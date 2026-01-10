import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenTrasladoService } from 'src/app/infrastructure/services/orders.service';
import { ResiduoOrden } from 'src/app/domain/entities/waste.entity';

@Component({
  selector: 'app-detail-order-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-order-row.html',
  styleUrl: './detail-order-row.css'
})
export class DetailOrderRow implements OnInit  {

  @Input({ required: true }) idOrden!: string;
  private ordenService = inject(OrdenTrasladoService);

  loading = signal(true);
  residuos = signal<ResiduoOrden[]>([]);

  async ngOnInit() {
    try {
      const data = await this.ordenService.obtenerResiduosPorOrden(this.idOrden);
      this.residuos.set(data ?? []);
    } catch (error) {
      console.error(error);
      this.residuos.set([]);
    } finally {
      this.loading.set(false);
    }
  }

}
