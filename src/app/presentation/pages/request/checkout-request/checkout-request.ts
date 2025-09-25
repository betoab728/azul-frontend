import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoStoreService }  from 'src/app/infrastructure/services/cart.service';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';  
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { EmbarcacionByGeneradorStoreService } from 'src/app/infrastructure/services/boats-bygenerator.service.js';

@Component({
  selector: 'app-checkout-request',
  standalone: true,
  imports: [FormsModule,CommonModule,NgSelectModule],
  templateUrl: './checkout-request.html',
  styleUrl: './checkout-request.css'
})

export class CheckoutRequest implements OnInit {
  empresa: any = null;
  embarcaciones: any; // 👈 se asigna en ngOnInit
  embarcacionSeleccionada: string | null = null;

  constructor(
    public carritoStore: CarritoStoreService,
    private authService: AuthService,
    private embarcacionStore: EmbarcacionByGeneradorStoreService
  ) {}

  async ngOnInit() {
    this.empresa = this.authService.getUser();

    // Asignamos la señal una vez inyectado el servicio
    this.embarcaciones = this.embarcacionStore.embarcaciones;

    await this.embarcacionStore.load();
  }

  confirmarSolicitud() {
    console.log('Empresa:', this.empresa?.razon_social, this.empresa?.ruc);
    console.log('Embarcación seleccionada:', this.embarcacionSeleccionada);
    console.log('Items del carrito:', this.carritoStore.items());
  }
}
