import { Component ,OnInit} from '@angular/core';
import { UnitStoreService } from 'src/app/infrastructure/services/unit-store.service';
import { Unit } from 'src/app/domain/entities/unit.entity';
import { CommonModule } from '@angular/common';
import { CreateUnitUseCase } from 'src/app/application/use-cases/units/create-unit.use-case';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-units',
  imports: [ CommonModule ],
  templateUrl: './units.html',
  styleUrl: './units.css'
})
export class Units implements OnInit {
  units: Unit[] = [];
  loading = true;

  constructor(
    private unitStoreService: UnitStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.unitStoreService.load();
      this.units = this.unitStoreService.units();
    } catch (error) {
      console.error('Error al obtener las unidades:', error);
       SwalService.error('No se pudieron cargar las unidades');
    } finally {
      this.loading = false;
    }
  }

  async onCreateUnit() {
   //navigate to create unit page
   await this.router.navigate(['/dashboard/unidades-medida/agregar']);
  }

}
