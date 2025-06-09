import { Component } from '@angular/core';
import { LoginUseCase } from '../../../application/use-cases/login.usecase';
import { LoginRequestDto } from '../../../application/dto/login-request.dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  credentials = {
    username: '',
    password: ''
  };

  errorMessage = '';
  constructor(
    private loginUseCase: LoginUseCase,
    private router: Router
  ) {}

  async onSubmit() {
    const dto: LoginRequestDto = {
      nombre: this.credentials.username,
      clave: this.credentials.password
    };

    try {
      const response = await this.loginUseCase.execute(dto);
      console.log('Login exitoso:', response);

      // Aquí puedes guardar el token, redirigir, etc.
      this.router.navigate(['/dashboard']); // o la ruta que desees
    } catch (error) {
      console.error('Error en login:', error);
      this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
    }

  }
}
