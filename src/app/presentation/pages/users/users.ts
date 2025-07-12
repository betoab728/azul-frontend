import { Component,OnInit } from '@angular/core';
import { GetAllUsersWithRoleUseCase } from '../../../application/use-cases/users/get-all-users.use-case';
import { UserWithRole } from '../../../domain/entities/user.entity';
import { CommonModule } from '@angular/common';
import { CreateUserUseCase } from '../../../application/use-cases/users/create-user.use-case';
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
    private  getAllUsersUseCase: GetAllUsersWithRoleUseCase,
    private createUserUseCase: CreateUserUseCase,
    private router: Router 
  ) {}

  async ngOnInit() {
    // Aquí puedes cargar los usuarios al iniciar el componente
    await this.loadUsers();
  }

  private async loadUsers() {
    this.loading = true;
    try {
      this.users = await this.getAllUsersUseCase.execute();
      console.log('Usuarios cargados:', this.users);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      // Aquí podrías usar un Swal o algún snackbar:
      // SwalService.error('No se pudieron cargar los usuarios');
    } finally {
      this.loading = false;
    }
  }
  async onCreateUser() {
  await this.router.navigate(['/dashboard/usuarios/agregar']);
  }

}
