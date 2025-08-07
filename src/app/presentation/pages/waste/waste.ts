import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroResiduoDetalle } from 'src/app/domain/entities/waste.entity';
import { RegistroResiduoStoreService } from 'src/app/infrastructure/services/waste-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-waste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './waste.html',
  styleUrl: './waste.css',
})
export class Waste implements OnInit {
  registros: RegistroResiduoDetalle[] = [];
  loading = true;

  constructor(
    private registroResiduoStoreService: RegistroResiduoStoreService,
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

  async onCreateRegistroResiduo() {
    await this.router.navigate(['/dashboard/registro-residuos/agregar']);
  }
}
