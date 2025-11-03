import { Component,OnInit } from '@angular/core';
//para navigation routerlink
import { RouterLink } from '@angular/router';
import { TranslateModule,TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

interface SidebarItem {
  label: string;
  icon: string;
  children?: { label: string; link: string }[];
  link?: string;
}


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ RouterLink,TranslateModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar  implements OnInit  {
  menus: SidebarItem[] = [];
  constructor(private translate: TranslateService, private authService: AuthService) {
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }
  ngOnInit(): void {
    const role = this.authService.getUserRole(); 
    console.log('Rol del usuario:', role);

    if (role === 'Administrador') {
      this.menus = this.getAdminMenus();
    } else if (role === 'cliente') {
      this.menus = this.getClientMenus();
    }
  }

  private getAdminMenus(): SidebarItem[] {
    return [
      {
        label: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        link: '/dashboard'
      },
      {
        label: 'Gestión de Usuarios',
        icon: 'fas fa-users',
        children: [
          { label: 'Usuarios', link: '/dashboard/usuarios' },
          { label: 'Roles', link: '/dashboard/roles' },
          { label: 'Empresas', link: '/dashboard/generadores' }
        ]
      },
      {
        label: 'Solicitudes y Cotizaciones',
        icon: 'fas fa-clipboard-list',
        children: [
          { label: 'Nueva Solicitud', link: '/dashboard/solicitud/agregar' },
          { label: 'Solicitudes', link: '/dashboard/solicitudes' },
          { label: 'Cotizaciones', link: '/dashboard/cotizaciones' }
        ]
      },
      {
        label: 'Gestión de Residuos',
        icon: 'fas fa-briefcase',
        children: [
          { label: 'Clasificación', link: '/dashboard/clasificacion' },
          { label: 'Tipo', link: '/dashboard/tipo-residuo' },
          { label: 'Unidades de Medida', link: '/dashboard/unidades-medida' },
          { label: 'Registro', link: '/dashboard/registro-residuos' }
        ]
      },
      {
        label: 'Gestión de Transporte',
        icon: 'fas fa-truck',
        children: [
          { label: 'Rutas', link: '/routes' },
          { label: 'Embarcaciones', link: '/dashboard/embarcaciones' },
          { label: 'Vehículos', link: '/dashboard/vehiculos' },
          { label: 'Tipos de Vehículos', link: '/dashboard/tipos-vehiculo' }
        ]
      },
      {
        label: 'Órdenes de Servicio',
        icon: 'fas fa-route',
        children: [
          { label: 'Listado de Órdenes', link: '/dashboard/ordenes' },
          { label: 'Trazabilidad', link: '/traceability' }
        ]
      }
    ];
  }

  private getClientMenus(): SidebarItem[] {
    return [
      {
        label: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        link: '/dashboard'
      },
      {
        label: 'Solicitudes y Cotizaciones',
        icon: 'fas fa-clipboard-list',
        children: [
          { label: 'Nueva Solicitud', link: '/dashboard/solicitud/agregar' },
          { label: 'Mis Solicitudes', link: '/dashboard/solicitudes/generador' },
          { label: 'Mis Cotizaciones', link: '/dashboard/cotizaciones/generador' }
        ]
      },
      {
        label: 'Órdenes de Servicio',
        icon: 'fas fa-route',
        children: [
          { label: 'Mis Órdenes', link: '/dashboard/ordenes/generador' },
          { label: 'Trazabilidad', link: '/traceability' }
        ]
      }
    ];
  }
}

