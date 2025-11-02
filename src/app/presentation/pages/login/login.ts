import { Component } from '@angular/core';
import { LoginUseCase } from '../../../application/use-cases/login.usecase';
import { LoginRequestDto } from '../../../application/dto/login-request.dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { LoginResponseDto } from 'src/app/application/dto/user.dto';


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
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    const dto: LoginRequestDto = {
      nombre: this.credentials.username,
      clave: this.credentials.password
    };

    try {
      const response: LoginResponseDto  = await this.loginUseCase.execute(dto);
      // Guardar token y usuario en el servicio de autenticación
      this.authService.setSession(response.access_token, response.user);
      console.log('Login exitoso:', response);
      this.router.navigate(['/dashboard']); 
    } catch (error) {
      console.error('Error en login:', error);
      this.errorMessage = 'Credenciales incorrectas o error en el servidor.';
    }

  }
}
