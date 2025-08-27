import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { UbigeoStoreService } from 'src/app/infrastructure/services/ubigeo-store.service';
import { CreateGeneradorResiduoUseCase } from 'src/app/application/use-cases/generator/create-generator.use-case';
import { GeneradorResiduoStoreService } from 'src/app/infrastructure/services/generator-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-generator',
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './add-generator.html',
  styleUrl: './add-generator.css',
  standalone: true,
})
export class AddGenerator {

    // Campos del formulario
    ruc = '';
    razonsocial = '';
    direccion = '';
    telefono = '';
    correo = '';
    dniResponsable = '';
    nombreResponsable = '';
    idDepartamento: number | null = null;
    idProvincia: number | null = null;
    idDistrito: number | null = null;

    constructor(
      public  ubigeoStore: UbigeoStoreService,
      private createGenerador: CreateGeneradorResiduoUseCase,
      private generadorStore: GeneradorResiduoStoreService,
      private router: Router
    ) {}

    async ngOnInit() {
      await this.ubigeoStore.loadDepartamentos();
    }
    onDepartamentoChange(departamento: any) {
      const id = departamento?.id;
      this.idDepartamento = id;
      this.idProvincia = null;
      this.idDistrito = null;
      this.ubigeoStore.loadProvincias(id);
    }
    onProvinciaChange(provincia: any) {
      const id = provincia?.id;
      this.idProvincia = id;
      this.idDistrito = null;
      this.ubigeoStore.loadDistritos(id);
    }

    async onSubmit(){
      if (!this.ruc || !this.razonsocial || !this.idDistrito) {
        SwalService.error('RUC, Razón social y Distrito son obligatorios');
        return;
      }

    const confirmado = await SwalService.confirm('¿Desea registrar este generador?');
    if (!confirmado) return;

    try {
      await this.createGenerador.execute({
        ruc: this.ruc,
        razonsocial: this.razonsocial,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        idDistrito: this.idDistrito?.toString(),
        dniResponsable: this.dniResponsable,
        nombreResponsable: this.nombreResponsable,
      });

      // 🔁 Actualizamos la lista de generadores
      await this.generadorStore.refresh();

      SwalService.success('Generador creado con éxito');
      await this.router.navigate(['/dashboard/generadores']);
    } catch (err) {
      console.error(err);
      SwalService.error('No se pudo crear el generador');
    }

    }

}
