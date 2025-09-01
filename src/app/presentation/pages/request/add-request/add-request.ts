import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroResiduoDetalle } from 'src/app/domain/entities/waste.entity';
import { RegistroResiduoStoreService } from 'src/app/infrastructure/services/waste-store.service';
import { CarritoStoreService } from 'src/app/infrastructure/services/cart.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-add-request',
  imports: [CommonModule],
  templateUrl: './add-request.html',
  styleUrl: './add-request.css'
})
export class AddRequest implements OnInit {

  registros: RegistroResiduoDetalle[] = [];
  loading = true;

  constructor(
    private registroResiduoStoreService: RegistroResiduoStoreService,
    private carritoStore: CarritoStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.registroResiduoStoreService.load();
      this.registros = this.registroResiduoStoreService.registros();
    } catch (error) {
      console.error('Error al cargar registros de residuos:', error);
      SwalService.error('No se pudieron cargar los registros de residuos');
    } finally {
      this.loading = false;
    }
  }

  agregarAlCarrito(residuo: RegistroResiduoDetalle) {
    this.carritoStore.agregar(residuo, 1);
    console.log("Residuo agregado:", residuo);
  }

  irAlCheckout() {
    this.router.navigate(['/dashboard/solicitud/checkout']);
  }

}
