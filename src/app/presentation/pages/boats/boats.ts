import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbarcacionDetalle } from 'src/app/domain/entities/boat.entity';
import { EmbarcacionStoreService } from 'src/app/infrastructure/services/boat-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-embarcaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './boats.html',
  styleUrls: ['./boats.css']
})
export class Embarcaciones implements OnInit {
  embarcaciones: EmbarcacionDetalle[] = [];
  loading = true;

  constructor(
    private embarcacionStoreService: EmbarcacionStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.embarcacionStoreService.load();
      this.embarcaciones = this.embarcacionStoreService.embarcaciones();
    } catch (error) {
      console.error('Error al cargar embarcaciones:', error);
      SwalService.error('No se pudieron cargar las embarcaciones');
    } finally {
      this.loading = false;
    }
  }

  async onCreateEmbarcacion() {
    await this.router.navigate(['/dashboard/embarcaciones/agregar']);
  }
}
