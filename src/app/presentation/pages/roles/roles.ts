import { Component,OnInit } from '@angular/core';
import { Role } from 'src/app/domain/entities/role.entity';
import { RoleStoreService } from 'src/app/infrastructure/services/role-store.service';
import { CommonModule } from '@angular/common';
import { CreateRoleUseCase } from 'src/app/application/use-cases/roles/create-role.use-case';
// Importa SwalService si lo necesitas para mostrar mensajes
import { SwalService } from 'src/app/infrastructure/services/swal.service'; 

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
    private roleStoreService: RoleStoreService,
    private createRoleUseCase: CreateRoleUseCase
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      await this.roleStoreService.load();
      this.roles = this.roleStoreService.roles();
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      // SwalService.error('No se pudieron cargar los roles');
    } finally {
      this.loading = false;
    }
  }

  async onCreateRole() {
    const result = await SwalService.roleInputPrompt();
    if (!result) return;

    try {
      const newRole: Role = { nombre: result.nombre, descripcion: result.descripcion };
      await this.createRoleUseCase.execute(newRole);
      await this.roleStoreService.refresh(); // 🔁 Refresca la lista desde la API
      SwalService.success('Rol creado correctamente');
    } catch (error) {
      console.error('Error al crear el rol:', error);
      SwalService.error('Hubo un error al registrar el rol');
    }
  }
}
