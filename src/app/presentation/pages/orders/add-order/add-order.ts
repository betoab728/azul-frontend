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
  observaciones: string = '';
  selectedFile: File | null = null;

  isLoading = false;
  //datos del encabezado de la orden
 ordenEncabezado: OrdenEncabezado | null = null;
  

  constructor( 
     private route: ActivatedRoute,
     private ordenService: OrdenTrasladoService ,
     private router: Router
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

  async guardarOrden() {
    if (!this.cotizacionId) {
      SwalService.error('ID de cotización no proporcionado.');
      return;
    }
    if (!this.selectedFile) {
      SwalService.error('Por favor, seleccione un archivo PDF.');
      return;
    }
    const confirmed = await SwalService.confirm('¿Desea enviar esta orden ?');
    if (!confirmed) return;
    this.isLoading = true;
    try {
      const response = await this.ordenService.crearOrden({
        id_cotizacion: this.cotizacionId,
        observaciones: this.observaciones,
        pdf_file: this.selectedFile
      });
      console.log('Orden creada con éxito:', response);
      SwalService.success('Orden de traslado creada exitosamente.');
      //redirigir a /dashboard/ordenes
      await this.router.navigate(['/dashboard/ordenes']);

    } catch (error) {
      console.error('Error al crear la orden de traslado:', error);
      SwalService.error('No se pudo crear la orden de traslado.');
    } finally {
      this.isLoading = false;
    }
  }


}
