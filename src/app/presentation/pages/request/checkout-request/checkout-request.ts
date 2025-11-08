import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CarritoStoreService } from 'src/app/infrastructure/services/cart.service';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { EmbarcacionByGeneradorStoreService } from 'src/app/infrastructure/services/boats-bygenerator.service';
import { PuertoService } from 'src/app/infrastructure/services/port.service';
import { SolicitudService } from 'src/app/infrastructure/services/send-request.service';
import { SolicitudCreate } from 'src/app/domain/entities/request.entity';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-checkout-request',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './checkout-request.html',
  styleUrl: './checkout-request.css'
})
export class CheckoutRequest implements OnInit { 
  empresa: any = null;
  observaciones: string = '';
  embarcaciones: any;
  embarcacionSeleccionada: string | null = null;
  direccionRecojo: string = '';
  puertos: any;
  puertoSeleccionado: string | null = null;

  usarPuerto: boolean = false;
  usarEmbarcacion: boolean = false;

  loading = true; // 👈 estado de carga

  constructor(
    public carritoStore: CarritoStoreService,
    private authService: AuthService,
    private embarcacionStore: EmbarcacionByGeneradorStoreService,
    public puertoService: PuertoService,
    private solicitudService: SolicitudService
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      this.empresa = this.authService.getUser();

      // ⚙️ Cargar datos en paralelo para optimizar
      await Promise.all([
        this.embarcacionStore.load(),
        this.puertoService.load()
      ]);

      this.embarcaciones = this.embarcacionStore.embarcaciones;
      this.puertos = this.puertoService.puertos;
    } catch (error) {
      console.error('Error al cargar datos del checkout:', error);
      SwalService.error('No se pudieron cargar los datos del formulario.');
    } finally {
      this.loading = false;
    }
  }

  async confirmarSolicitud() {
    if ( this.direccionRecojo.trim() === '') {
      SwalService.warning('Debe indicar una dirección de recojo');
      return;
    }

    if (this.carritoStore.items().length === 0) {
      SwalService.warning('Debe agregar al menos un residuo al carrito');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea registrar esta solicitud de cotización?');
    if (!confirmed) return;

    const payload: SolicitudCreate = {
      fecha: new Date().toISOString().split('T')[0],
      id_puerto: this.puertoSeleccionado || null,
      id_estado_solicitud: '46512df5-a54a-45cc-a7c2-0197c549084b',
      observaciones: this.observaciones,
      id_embarcacion: this.embarcacionSeleccionada || null,
      direccion_recojo: this.direccionRecojo,
      detalles: this.carritoStore.items().map(item => ({
        id_residuo: item.residuo.id,
        cantidad: item.cantidad
      }))
    };

    try {
      const response = await this.solicitudService.crearSolicitud(payload);
      await SwalService.success(`Solicitud registrada con éxito. ID: ${response.id}`);

      this.carritoStore.limpiar();
      this.observaciones = '';
      this.embarcacionSeleccionada = null;
      this.puertoSeleccionado = null;
      this.direccionRecojo = '';
    } catch (error) {
      console.error('Error al registrar solicitud:', error);
      SwalService.error('Hubo un error al registrar la solicitud');
    }
  }
  soloNumeros(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    // Permitir solo números (0–9)
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
  actualizarCantidad(item: any, valor: string) {
    if (typeof valor !== 'string') valor = String(valor);
  
    // Eliminamos todo lo que no sea dígito
    const soloNumeros = valor.replace(/[^0-9]/g, '');
  
    // Evitar modificaciones innecesarias que re-rendericen sin cambios
    if (item.cantidad === soloNumeros) return;
  
    // Actualiza el modelo local (para que el input muestre el valor limpio)
    item.cantidad = soloNumeros;
  
    // Actualiza el store; si tu store espera number, conviértelo:
    const cantidadParaStore = soloNumeros === '' ? 0 : parseInt(soloNumeros, 10);
    this.carritoStore.actualizarCantidad(item.residuo.id, cantidadParaStore);
  }
}
