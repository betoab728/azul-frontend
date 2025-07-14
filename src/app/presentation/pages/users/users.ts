import { Component,OnInit } from '@angular/core';
import { UserStoreService } from '../../../infrastructure/services/user-store.service';
import { UserWithRole } from '../../../domain/entities/user.entity';
import { CommonModule } from '@angular/common';
import { SwalService } from '../../../infrastructure/services/swal.service.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [ CommonModule ],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {

  users: UserWithRole[] = [];
  loading = true; 

  constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.userStoreService.load();
      this.users = this.userStoreService.users();
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      SwalService.error('No se pudieron cargar los usuarios');
    } finally {
      this.loading = false;
    }
  }

  async onCreateUser() {
  await this.router.navigate(['/dashboard/usuarios/agregar']);
  }

}
