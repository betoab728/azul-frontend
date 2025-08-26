import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneradorResiduoDetalle } from 'src/app/domain/entities/generator.entity'
import { GeneradorResiduoStoreService } from 'src/app/infrastructure/services/generator-store.service.js';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-generators',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './generators.html',
  styleUrl: './generators.css'
})
export class Generators implements OnInit {

  generadores: GeneradorResiduoDetalle[] = [];
  loading = true;

  constructor(
    private generadorStoreService: GeneradorResiduoStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.generadorStoreService.load();
      this.generadores = this.generadorStoreService.generadores();
    } catch (error) {
      console.error('Error al cargar generadores de residuos:', error);
      SwalService.error('No se pudieron cargar los generadores');
    } finally {
      this.loading = false;
    }
  }

  async onCreateGenerador() {
    await this.router.navigate(['/dashboard/generadores/agregar']);
  }

}
