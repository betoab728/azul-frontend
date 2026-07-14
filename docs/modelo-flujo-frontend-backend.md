# Modelo de Flujo Frontend-Backend

## Arquitectura General

El proyecto sigue **Clean Architecture** con 4 capas bien definidas y un flujo de datos unidireccional desde la vista hasta la API:

```
Presentation --> Infrastructure (Store) --> Application (Use Case) --> Domain (Repository Abstracto)
                                                                          |
                                                                          v
                                                                   Infrastructure (Repository Impl) --> HTTP --> Backend API
```

---

## Caso de Estudio: "Leads Contacto"

### 1. Disparador: Sidebar (Presentation)

**Archivo:** `src/app/presentation/layouts/dashboard-layout/sidebar/sidebar.ts`

El menú "Leads Contacto" se renderiza solo para rol `Administrador`. Al hacer clic, navega a `/dashboard/leads-contacto`.

```typescript
// sidebar.ts:92-95
{
  label: 'Leads Contacto',
  icon: 'fas fa-address-book',
  link: '/dashboard/leads-contacto'
}
```

---

### 2. Routing: Carga Lazy del Componente

**Archivo:** `src/app/app.routes.ts:56`

La ruta `/dashboard/leads-contacto` carga de forma lazy el componente `LeadsContacto`. Está anidada dentro del layout `DashboardLayout`.

```
/dashboard  -->  DashboardLayout
  └── leads-contacto  -->  LeadsContacto (lazy)
```

---

### 3. Página: Componente de Presentación

**Archivo:** `src/app/presentation/pages/leads-contacto/leads-contacto.ts`

El componente `LeadsContacto` consume el `LeadContactoStoreService` (store centralizado con signals). En `ngOnInit`:

```typescript
async ngOnInit() {
  await this.leadContactoStoreService.load();       // dispara la carga
  this.leads = this.leadContactoStoreService.leads(); // obtiene los datos reactivos
}
```

La plantilla (`leads-contacto.html`) renderiza una tabla con los campos: nombre, empresa, sector, desafío ambiental, correo, teléfono, origen, estado y fecha de registro.

---

### 4. Store Service: Estado Centralizado con Signals

**Archivo:** `src/app/infrastructure/services/lead-contacto-store.service.ts`

Actúa como fachada entre la vista y los casos de uso. Gestiona el estado con Angular Signals y un flag `_isLoaded` para cachear datos (evita múltiples llamadas).

```typescript
async load() {
  if (this._isLoaded()) return;                       // caché: no recarga si ya tiene datos
  const data = await this.getLeadsContactoUseCase.execute();
  this._leads.set(data);
  this._isLoaded.set(true);
}
```

También expone `refresh()` para forzar recarga y `clear()` para limpiar el estado.

---

### 5. Use Case: Lógica de Orquestación

**Archivo:** `src/app/application/use-cases/leads-contacto/get-leads-contacto.use-case.ts`

El caso de uso `GetLeadsContactoUseCase`:

1. Llama al repositorio (abstracción) → `this.leadContactoRepository.getAll()`
2. Recibe DTOs (snake_case del backend)
3. Mapea cada DTO a una entidad de dominio (camelCase) mediante `mapToEntity()`

```typescript
async execute(): Promise<LeadContacto[]> {
  const dtos = await this.leadContactoRepository.getAll();
  return dtos.map(dto => this.mapToEntity(dto));
}
```

**Mapeo DTO → Entidad:**

| DTO (snake_case)       | Entidad (camelCase)   |
|------------------------|-----------------------|
| `nombre_completo`      | `nombreCompleto`      |
| `desafio_ambiental`    | `desafioAmbiental`    |
| `created_at`           | `createdAt`           |
| `updated_at`           | `updatedAt`           |

---

### 6. DTO: Contrato de Respuesta del Backend

**Archivo:** `src/app/application/dto/lead-contacto-response.dto.ts`

Define la forma exacta de los datos que envía el backend (snake_case, convención Django/API REST):

```typescript
export interface LeadContactoResponseDto {
  id: string;
  nombre_completo: string;
  empresa: string;
  sector: string;
  desafio_ambiental: string;
  correo: string;
  telefono: string;
  origen: string;
  estado: string;
  created_at: string;
  updated_at: string;
}
```

---

### 7. Entity: Modelo de Dominio

**Archivo:** `src/app/domain/entities/lead-contacto.entity.ts`

Define la entidad tal como se usa en el frontend (camelCase):

```typescript
export interface LeadContacto {
  id: string;
  nombreCompleto: string;
  empresa: string;
  sector: string;
  desafioAmbiental: string;
  correo: string;
  telefono: string;
  origen: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
}
```

---

### 8. Repository Interface: Contrato Abstracto (Domain)

**Archivo:** `src/app/domain/repositories/lead-contacto.repository.ts`

Define el contrato que debe cumplir cualquier implementación de repositorio. El dominio no conoce detalles de HTTP, solo la firma del método:

```typescript
export abstract class LeadContactoRepository {
  abstract getAll(): Promise<LeadContactoResponseDto[]>;
}
```

---

### 9. Repository Implementation: Adaptador HTTP (Infrastructure)

**Archivo:** `src/app/infrastructure/repositories/lead-contacto-api.repository.ts`

Implementación concreta que usa `HttpClient` de Angular para hacer la petición GET al backend. Convierte el Observable a Promise con `firstValueFrom`.

```typescript
@Injectable()
export class LeadContactoApiRepository implements LeadContactoRepository {
  private url = endpoints.leadsContacto;

  constructor(private http: HttpClient) {}

  async getAll(): Promise<LeadContactoResponseDto[]> {
    return await firstValueFrom(this.http.get<LeadContactoResponseDto[]>(this.url));
  }
}
```

---

### 10. Endpoints: Configuración de URLs

**Archivo:** `src/app/infrastructure/config/endpoints.ts`

Centraliza todas las URLs del backend. La URL final se construye concatenando `environment.apiUrl` + ruta del recurso:

```typescript
leadsContacto: `${environment.apiUrl}/leads-contacto`
```

**Environment (desarrollo):**

```typescript
// src/environments/environment.ts
apiUrl: 'https://azul-backend-production.up.railway.app'
```

**URL final:** `https://azul-backend-production.up.railway.app/leads-contacto`

---

### 11. Dependency Injection: Wiring (app.config.ts)

**Archivo:** `src/app/app.config.ts:64`

La inyección de dependencias de Angular conecta la abstracción con la implementación:

```typescript
{ provide: LeadContactoRepository, useClass: LeadContactoApiRepository }
```

Esto permite cambiar la implementación (ej. mock para tests) sin modificar el dominio ni los casos de uso.

---

### 12. Auth Interceptor: Token en Cada Request

**Archivo:** `src/app/infrastructure/services/auth.interceptor.ts`

Toda petición HTTP pasa por este interceptor, que añade el header `Authorization: Bearer <token>` obtenido del `AuthService`.

---

## Diagrama de Secuencia Completo

```
Usuario        Sidebar       Router       LeadsContacto       LeadContactoStore      GetLeadsContactoUseCase    LeadContactoRepository    HttpClient    Backend API
  |               |             |               |                     |                        |                         |               |              |
  |-- clic ------->|             |               |                     |                        |                         |               |              |
  |               |-- navigate ->|               |                     |                        |                         |               |              |
  |               |             |-- lazy load ->|                     |                        |                         |               |              |
  |               |             |               |-- ngOnInit() ------>|                        |                         |               |              |
  |               |             |               |                     |-- isLoaded? (false)    |                         |               |              |
  |               |             |               |                     |-- execute() ---------->|                         |               |              |
  |               |             |               |                     |                        |-- getAll() ------------>|               |              |
  |               |             |               |                     |                        |                         |-- GET /leads-contacto --->|              |
  |               |             |               |                     |                        |                         |               |-- auth token |
  |               |             |               |                     |                        |                         |<-- 200 JSON[] ------------|
  |               |             |               |                     |                        |<-- LeadContactoResponseDto[]              |               |
  |               |             |               |                     |                        |-- mapToEntity() ------>|               |              |
  |               |             |               |                     |<-- LeadContacto[] ------|                         |               |              |
  |               |             |               |                     |-- _leads.set(data)     |                         |               |              |
  |               |             |               |<-- leads() signal ---|                        |                         |               |              |
  |               |             |               |-- render tabla ----->|                        |                         |               |              |
  |<-- vista -----|-------------|---------------|                     |                        |                         |               |              |
```

---

## Resumen del Flujo (6 capas)

| # | Capa | Archivo(s) Clave | Responsabilidad |
|---|------|-----------------|-----------------|
| 1 | **Presentation** | `sidebar.ts`, `leads-contacto.ts`, `leads-contacto.html` | Interfaz de usuario, navegación, renderizado |
| 2 | **Infrastructure (Store)** | `lead-contacto-store.service.ts` | Estado centralizado con signals, caché de datos |
| 3 | **Application** | `get-leads-contacto.use-case.ts`, `lead-contacto-response.dto.ts` | Orquestación, mapeo DTO → Entidad |
| 4 | **Domain** | `lead-contacto.entity.ts`, `lead-contacto.repository.ts` | Entidades y contratos abstractos |
| 5 | **Infrastructure (Impl)** | `lead-contacto-api.repository.ts`, `endpoints.ts`, `auth.interceptor.ts` | HTTP, autenticación, URLs del backend |
| 6 | **DI Config** | `app.config.ts` | Vinculación abstracción ↔ implementación |

## Convenciones

- **Backend devuelve snake_case** (ej. `nombre_completo`, `created_at`) — típico de Django REST Framework
- **Frontend usa camelCase** (ej. `nombreCompleto`, `createdAt`) — convención TypeScript/Angular
- **El mapeo ocurre en el Use Case**, no en el repositorio ni en el componente
- **El repositorio trabaja con DTOs**, no con entidades de dominio
- **El Store centraliza el estado** con signals y evita llamadas duplicadas al backend
