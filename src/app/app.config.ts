import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthRepository } from './domain/repositories/auth.repository';
//import { AuthApiRepository } from '../../infraestructure/repositories/auth-api.repository';
import { AuthApiRepository } from './infrastructure/repositories/auth-api.repository';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: AuthRepository, useClass: AuthApiRepository }
  ]
};
