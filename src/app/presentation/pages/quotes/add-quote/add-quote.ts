import { Component,OnInit  } from '@angular/core';
import { DetalleSolicitudService } from 'src/app/infrastructure/services/request-detail.service';
import { ItemCotizacion } from 'src/app/domain/entities/request.entity.js';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
  selector: 'app-add-quote',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './add-quote.html',
  styleUrl: './add-quote.css'
})
export class AddQuote implements OnInit  {

  empresa: any = null;
  observaciones: string = '';
  puntoRecojo: string = '';

  items: ItemCotizacion[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private detalleService: DetalleSolicitudService
  ) {}

  async ngOnInit(){
    this.empresa = this.authService.getUser();
  
    const idSolicitud = this.route.snapshot.paramMap.get('idSolicitud');
    if (idSolicitud) {
      await this.detalleService.loadBySolicitud(idSolicitud);
      const detalles = this.detalleService.detalles();
      console.log('Detalles cargados para la solicitud:', detalles);
      // Transformamos el detalle en items con precio
      this.items = detalles.map(d => ({
        ...d,
        precio: 0,
        subtotal: 0,
      }));
    }
  }
  actualizarPrecio(item: ItemCotizacion, nuevoPrecio: number) {
    item.precio = nuevoPrecio;
    item.subtotal = item.cantidad * item.precio;
  }

  get totalGeneral(): number {
    return this.items.reduce((acc, i) => acc + i.subtotal, 0);
  }

  guardarCotizacion() {
    const payload = {
      items: this.items.map(i => ({
        residuo: i.residuo,
        cantidad: i.cantidad,
        unidad: i.unidad,
        precio: i.precio,
        subtotal: i.subtotal,
      })),
      total: this.totalGeneral,
    };

    console.log('Cotización lista para enviar:', payload);
    // aquí llamarías al servicio backend
  }




}
