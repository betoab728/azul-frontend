import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthRepository } from './domain/repositories/auth.repository';
//import { AuthApiRepository } from '../../infraestructure/repositories/auth-api.repository';
import { AuthApiRepository } from './infrastructure/repositories/auth-api.repository';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './infrastructure/services/auth.interceptor';
//declarar classification.repository y classification-api.repository
import { ClassificationRepository } from './domain/repositories/classification.repository';
import { ClassificationApiRepository } from './infrastructure/repositories/classification-api.repository';

import { routes } from './app.routes';
import { RoleRepository } from './domain/repositories/role.repository';
import { RoleApiRepository } from './infrastructure/repositories/role-api.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { UserApiRepository } from './infrastructure/repositories/user-api.repository';
//unidad repository y unidad-api.repository
import { UnitRepository } from './domain/repositories/unit.repository';
import { UnitApiRepository } from './infrastructure/repositories/unit-api.repository';
import { TipoResiduoApiRepository } from './infrastructure/repositories/type-api.repository';
import { TipoResiduoRepository } from './domain/repositories/type.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),
    { provide: AuthRepository, useClass: AuthApiRepository }
    , { provide: ClassificationRepository, useClass: ClassificationApiRepository },
      {provide: RoleRepository, useClass: RoleApiRepository},
      {provide:UserRepository, useClass: UserApiRepository},
      {provide: UnitRepository, useClass: UnitApiRepository},
      {provide: TipoResiduoRepository, useClass: TipoResiduoApiRepository}
      
  ]
};
