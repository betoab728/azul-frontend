import { Component } from '@angular/core';
import { Role } from 'src/app/domain/entities/role.entity';
import { GetAllRolesUseCase } from 'src/app/application/use-cases/roles/get-all-roles.use-case';
import { CreateUserUseCase } from 'src/app/application/use-cases/users/create-user.use-case';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.html',
  styleUrl: './add-user.css',
  standalone: true,
  imports: [FormsModule, CommonModule, NgSelectModule],
})
export class AddUser {
  nombre = '';
  correo = '';
  clave = '';
  confirmarClave = ''; // nuevo campo
  idRol: string = '';
  roles: Role[] = [];

  constructor(
    private getAllRolesUseCase: GetAllRolesUseCase,
    private createUserUseCase: CreateUserUseCase
  ) {}

  async ngOnInit() {
    this.roles = await this.getAllRolesUseCase.execute();
  }

  async onSubmit() {
    if (!this.nombre || !this.correo || !this.clave || !this.confirmarClave || !this.idRol) {
      SwalService.error('Todos los campos son obligatorios');
      return;
    }

    if (this.clave !== this.confirmarClave) {
      SwalService.error('Las contraseñas no coinciden');
      return;
    }

    const confirmed = await SwalService.confirm('¿Desea registrar este usuario?');
    if (!confirmed) return;

    const user = {
      nombre: this.nombre,
      correo: this.correo,
      clave: this.clave,
      idRol: this.idRol,
    };

    try {
      await this.createUserUseCase.execute(user);
      SwalService.success('Usuario creado con éxito');
      this.resetForm();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      SwalService.error('No se pudo crear el usuario');
    }
  }

  private resetForm() {
    this.nombre = '';
    this.correo = '';
    this.clave = '';
    this.confirmarClave = '';
    this.idRol = '';
  }
}