import { Component,OnInit } from '@angular/core';
import { GetAllRolesUseCase } from '../../../application/use-cases/roles/get-all-roles.use-case';
import { Role } from '../../../domain/entities/role.entity';
import { CommonModule } from '@angular/common';
import { CreateRoleUseCase } from '../../../application/use-cases/roles/create-role.use-case';
// Importa SwalService si lo necesitas para mostrar mensajes
import { SwalService } from '../../../infrastructure/services/swal.service.js'; 

@Component({
  selector: 'app-roles',
  imports: [ CommonModule ],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles implements OnInit {

  roles: Role[] = [];  
  loading = true; 

  constructor(
    private getAllRolesUseCase: GetAllRolesUseCase,
    private createRoleUseCase: CreateRoleUseCase
  ) {}

  async ngOnInit() {
    // Aquí puedes cargar los roles al iniciar el componente
    await this.loadRoles();
  }

  private async loadRoles() {
    this.loading = true;
    try {
      this.roles = await this.getAllRolesUseCase.execute();
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      // Aquí podrías usar un Swal o algún snackbar:
      // SwalService.error('No se pudieron cargar los roles');
    } finally {
      this.loading = false;
    }
  }

  async onCreateRole() {
    const result = await SwalService.roleInputPrompt(); // Muestra un modal con 2 inputs
  
    if (!result) return; // Usuario canceló o no completó los campos
  
    try {
      const newRole: Role = { nombre: result.nombre, descripcion: result.descripcion };
      await this.createRoleUseCase.execute(newRole);
      await this.loadRoles();
      SwalService.success('Rol creado correctamente');
    } catch (error) {
      console.error('Error al crear el rol:', error);
      SwalService.error('Hubo un error al registrar el rol');
    }
  }

}
