import { Component } from '@angular/core';
import { Role } from 'src/app/domain/entities/role.entity';
import { GetAllRolesUseCase } from 'src/app/application/use-cases/roles/get-all-roles.use-case';
import { CreateUserUseCase } from 'src/app/application/use-cases/users/create-user.use-case';
import { UserStoreService } from 'src/app/infrastructure/services/user-store.service';
import { SwalService } from 'src/app/infrastructure/services/swal.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GeneradorResiduoDetalle } from 'src/app/domain/entities/generator.entity.js';
import { GetAllGeneradoresResiduosUseCase } from 'src/app/application/use-cases/generator/get-all-generator.use-case.js';

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
  idGenerador: string = '';
  roles: Role[] = [];
  generadores:  GeneradorResiduoDetalle[] = [];

  constructor(
    private getAllRolesUseCase: GetAllRolesUseCase,
    private getAllGeneradoresUseCase: GetAllGeneradoresResiduosUseCase,
    private createUserUseCase: CreateUserUseCase,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}
  async ngOnInit() {
    this.roles = await this.getAllRolesUseCase.execute();
    this.generadores = await this.getAllGeneradoresUseCase.execute();
    console.log( 'lista generadores ngoninit', this.generadores);
  }

  async onSubmit() {
    if (!this.nombre || !this.correo || !this.clave || !this.confirmarClave || !this.idRol || !this.idGenerador) {
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
      idGenerador: this.idGenerador
    };

    try {
      await this.createUserUseCase.execute(user);

      // 🔁 Recarga desde la API
      await this.userStoreService.refresh();

      SwalService.success('Usuario creado con éxito');
      this.resetForm();

      // Redirigir al listado
      await this.router.navigate(['/dashboard/usuarios']);
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
    this.idGenerador = '';
  }
}