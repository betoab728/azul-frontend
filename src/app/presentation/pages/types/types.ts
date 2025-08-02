import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoResiduoWithClasificacion } from 'src/app/domain/entities/types.entity';
import { TipoResiduoStoreService } from 'src/app/infrastructure/services/type-store.service';
import { Router } from '@angular/router';
import { SwalService } from 'src/app/infrastructure/services/swal.service';

@Component({
  selector: 'app-types',
  imports: [CommonModule],
  templateUrl: './types.html',
  styleUrl: './types.css'
})
export class Types implements OnInit {

  tipos: TipoResiduoWithClasificacion[] = [];
  loading = true;
  constructor(
    private tipoResiduoStoreService: TipoResiduoStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.tipoResiduoStoreService.load();
      this.tipos = this.tipoResiduoStoreService.tipos();
    } catch (error) {
      console.error('Error al cargar tipos de residuo:', error);
      SwalService.error('No se pudieron cargar los tipos de residuo');
    } finally {
      this.loading = false;
    }
  }
  async onCreateTipoResiduo() {
    await this.router.navigate(['/dashboard/tipos-residuo/agregar']);
  }

}
