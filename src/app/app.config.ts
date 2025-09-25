import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './infrastructure/services/auth.interceptor';

// Repositorios
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthApiRepository } from './infrastructure/repositories/auth-api.repository';
import { ClassificationRepository } from './domain/repositories/classification.repository';
import { ClassificationApiRepository } from './infrastructure/repositories/classification-api.repository';
import { RoleRepository } from './domain/repositories/role.repository';
import { RoleApiRepository } from './infrastructure/repositories/role-api.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { UserApiRepository } from './infrastructure/repositories/user-api.repository';
import { UnitRepository } from './domain/repositories/unit.repository';
import { UnitApiRepository } from './infrastructure/repositories/unit-api.repository';
import { TipoResiduoRepository } from './domain/repositories/type.repository';
import { TipoResiduoApiRepository } from './infrastructure/repositories/type-api.repository';
import { RegistroResiduoRepository } from './domain/repositories/waste.repository';
import { RegistroResiduoApiRepository } from './infrastructure/repositories/waste-api.repository';
import { GeneradorResiduoRepository } from './domain/repositories/generator.repository';
import { GeneradorResiduoApiRepository } from './infrastructure/repositories/generator-api.repository';
import { UbigeoRepository } from './domain/repositories/ubigeo.repository';
import { UbigeoApiRepository } from './infrastructure/repositories/ubigeo-api.repository';
import { EmbarcacionApiRepository } from './infrastructure/repositories/boat-api.repository';

// Traducción
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';
import { EmbarcacionRepository } from './domain/repositories/boat.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    ),

    // Repositorios
    { provide: AuthRepository, useClass: AuthApiRepository },
    { provide: ClassificationRepository, useClass: ClassificationApiRepository },
    { provide: RoleRepository, useClass: RoleApiRepository },
    { provide: UserRepository, useClass: UserApiRepository },
    { provide: UnitRepository, useClass: UnitApiRepository },
    { provide: TipoResiduoRepository, useClass: TipoResiduoApiRepository },
    { provide: RegistroResiduoRepository, useClass: RegistroResiduoApiRepository },
    { provide: GeneradorResiduoRepository, useClass: GeneradorResiduoApiRepository },
    { provide: UbigeoRepository, useClass: UbigeoApiRepository },
    { provide: EmbarcacionRepository, useClass: EmbarcacionApiRepository },

    // Configuración de ngx-translate
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'es',
      lang: 'es'
    })
  ]
};
