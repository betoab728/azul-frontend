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
  embarcaciones: any[] = [];
  embarcacionSeleccionada: string | null = null;
  direccionRecojo: string = '';
  puertos: any[] = [];
  puertoSeleccionado: string | null = null;

  usarPuerto: boolean = false;
  usarEmbarcacion: boolean = false;
  loading = true;

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

      await Promise.all([
        this.embarcacionStore.load(),
        this.puertoService.load()
      ]);

      this.embarcaciones = this.embarcacionStore.embarcaciones();
      this.puertos = this.puertoService.puertos();

      // Si hay embarcaciones, se activa el uso de embarcación y puerto
    this.usarEmbarcacion = this.embarcaciones.length > 0;
    this.usarPuerto = this.usarEmbarcacion; // Solo tiene sentido si hay barco

    } catch (error) {
      console.error('Error al cargar datos del checkout:', error);
      SwalService.error('No se pudieron cargar los datos del formulario.');
    } finally {
      this.loading = false;
    }
  }

  async confirmarSolicitud() {
    if (this.direccionRecojo.trim() === '') {
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
}
