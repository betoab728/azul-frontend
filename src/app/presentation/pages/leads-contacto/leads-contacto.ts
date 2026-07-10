import { Component, OnInit } from '@angular/core';
import { LeadContactoStoreService } from '../../../infrastructure/services/lead-contacto-store.service';
import { LeadContacto } from '../../../domain/entities/lead-contacto.entity';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../infrastructure/services/swal.service.js';

@Component({
  selector: 'app-leads-contacto',
  imports: [CommonModule],
  templateUrl: './leads-contacto.html',
  styleUrl: './leads-contacto.css'
})
export class LeadsContacto implements OnInit {
  leads: LeadContacto[] = [];
  loading = true;

  constructor(
    private leadContactoStoreService: LeadContactoStoreService
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.leadContactoStoreService.load();
      this.leads = this.leadContactoStoreService.leads();
    } catch (error) {
      console.error('Error al obtener leads de contacto:', error);
      SwalService.error('No se pudieron cargar los leads de contacto');
    } finally {
      this.loading = false;
    }
  }
}
