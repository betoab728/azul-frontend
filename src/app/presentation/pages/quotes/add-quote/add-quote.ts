import { Component,OnInit  } from '@angular/core';
import { DetalleSolicitudService } from 'src/app/infrastructure/services/request-detail.service';
import { DetalleSolicitudCarrito } from 'src/app/domain/entities/request.entity.js';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { CotizacionService } from 'src/app/infrastructure/services/quote.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service.js';
import { VehiculoService } from 'src/app/infrastructure/services/vehicle-store.service';
import { VehiculoList } from 'src/app/domain/entities/vehicle'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quote',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './add-quote.html',
  styleUrl: './add-quote.css'
})
export class AddQuote implements OnInit  {

  empresa: any = null;
  observaciones: string = '';
  formaPago: string = '';
  selectedFile: File | null = null;
  items: DetalleSolicitudCarrito[] = [];
  idSolicitud: string | null = null;
  isLoading = false;
  vehiculos: VehiculoList[] = [];
  idVehiculoSeleccionado: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private detalleService: DetalleSolicitudService,
    private cotizacionService: CotizacionService,
    private vehiculoService: VehiculoService
  ) {}

  async ngOnInit(){
    const navigation = this.router.getCurrentNavigation();
  this.empresa = navigation?.extras.state?.['razonSocial'] ?? '—';
  
  this.idSolicitud = this.route.snapshot.paramMap.get('idSolicitud');
    if (this.idSolicitud) {
      await this.detalleService.loadBySolicitud(this.idSolicitud);
      this.items = this.detalleService.detalles();
       
    }
    
    //  Cargar vehículos disponibles
    if (this.vehiculoService.vehiculos().length === 0) {
      await this.vehiculoService.load();
    }
    this.vehiculos = this.vehiculoService.vehiculos();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  
 
  async guardarCotizacion() {
    
    if (!this.idSolicitud) {
      SwalService.warning('No se encontró la solicitud asociada.');
      return;
    }
    if (!this.formaPago.trim()) {
      SwalService.warning('Debe ingresar la forma de pago.');
      return;
    }
  
    if (!this.selectedFile) {
      SwalService.warning('Debe adjuntar un archivo PDF de cotización.');
      return;
    }
    const confirmed = await SwalService.confirm('¿Desea enviar esta cotización?');
    if (!confirmed) return;

    this.isLoading = true;

    try {
      const response = await this.cotizacionService.crearCotizacion({
        id_solicitud: this.idSolicitud,
        forma_pago: this.formaPago,
        fecha_emision: new Date().toISOString().split('T')[0],
        id_estado_cotizacion: '8cc9f8cd-0ebb-4e92-8437-fb1f4cc994e0',
        observaciones: this.observaciones,
        pdf_file: this.selectedFile,
        id_vehiculo: this.idVehiculoSeleccionado
      });
  
      console.log('Cotización creada:', response);
  
      await SwalService.success(
        `Cotización enviada correctamente.<br><small>ID: ${response.data.id}</small>`
      );
       // limpiar formulario
      this.formaPago = '';
      this.observaciones = '';
      this.selectedFile = null;

      //navegar a /dashboard/quotes
      await this.router.navigate(['/dashboard/cotizaciones']);


    } catch (error) {
      console.error('Error al enviar la cotización:', error);
      SwalService.error('Ocurrió un error al enviar la cotización.');
    } finally {
      this.isLoading = false;
    }
  }

}
