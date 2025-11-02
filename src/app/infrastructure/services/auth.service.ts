import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginResponseDto } from 'src/app/application/dto/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly ROLE_KEY = 'rol';

  constructor(private router: Router) {}

  // Guardar token y usuario después del login
  setSession(token: string, user: UserLoginResponseDto): void {

    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  //  Obtener token (usado por el interceptor)
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //  Obtener usuario logueado
  getUser(): any | null {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  //obtenr rol del usuario
  getUserRole(): string | null {
    const user = localStorage.getItem(this.USER_KEY);
   //el modelo es UserLoginResponseDto, extraer el rol
    if (user) {
      const userObj: UserLoginResponseDto = JSON.parse(user);
      return userObj.rol || null;
    }
    return null;
  }

  // Saber si hay sesión activa
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/login']);
  }
}
