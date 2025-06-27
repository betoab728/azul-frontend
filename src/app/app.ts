import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//interceptor
import { AuthInterceptor } from './infrastructure/services/auth.interceptor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gestion-residuos-frontend';
}
