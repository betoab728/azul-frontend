import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdenTrasladoService } from 'src/app/infrastructure/services/orders.service';
import { OrdenEncabezado } from 'src/app/domain/entities/order.entity';


@Component({
  selector: 'app-add-order',
  imports: [],
  templateUrl: './add-order.html',
  styleUrl: './add-order.css'
})
export class AddOrder  implements OnInit  {
  
  cotizacionId: string | null = null;
  isLoading = false;
  //datos del encabezado de la orden
 ordenEncabezado: OrdenEncabezado | null = null;
  

  constructor( 
     private route: ActivatedRoute,
     private ordenService: OrdenTrasladoService 
    ) { }
  async ngOnInit(){
    this.cotizacionId = this.route.snapshot.paramMap.get('cotizacionId');
    console.log('ID de cotización recibido:', this.cotizacionId);
    await this.loadOrderHeader();
  }


  //cargamos los datos con obtenerEncabezado
  async loadOrderHeader() {
    this.isLoading = true;
    try {
      const encabezado = await this.ordenService.obtenerEncabezado();
      this.ordenEncabezado = encabezado;
      console.log('Encabezado de la orden cargado:', encabezado);
    } catch (error) {
      console.error('Error al cargar el encabezado de la orden:', error);
      SwalService.error('No se pudo cargar el encabezado de la orden');
    } finally {
      this.isLoading = false;
    }
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const selectedFile = input.files[0];
      console.log('Archivo seleccionado:', selectedFile);
    }
  }


}
