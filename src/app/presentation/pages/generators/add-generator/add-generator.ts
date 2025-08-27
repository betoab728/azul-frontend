import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GoogleMapsModule } from '@angular/google-maps';  
import { UbigeoStoreService } from 'src/app/infrastructure/services/ubigeo-store.service';
import { CreateGeneradorResiduoUseCase } from 'src/app/application/use-cases/generator/create-generator.use-case';
import { GeneradorResiduoStoreService } from 'src/app/infrastructure/services/generator-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-generator',
  imports: [FormsModule, CommonModule, NgSelectModule,GoogleMapsModule],
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

    // 📌 Campos para Google Maps
    center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 }; // Centro inicial (Lima)
    zoom = 14;
    marker: google.maps.LatLngLiteral | null = null; // Para guardar el punto seleccionado

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

    // 📌 Evento cuando se hace clic en el mapa
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.marker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log('Ubicación seleccionada:', this.marker);
    }
  }

    async onSubmit(){
      if (!this.ruc || !this.razonsocial || !this.idDistrito) {
        SwalService.error('RUC, Razón social y Distrito son obligatorios');
        return;
      }

      if (!this.marker) {
        SwalService.error('Debe seleccionar la ubicación en el mapa');
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
        latitud: this.marker.lat, //guardamos latitud y longitud
        longitud: this.marker.lng,
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
