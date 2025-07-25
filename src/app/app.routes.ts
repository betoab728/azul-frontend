import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { DashboardLayout } from './presentation/layouts/dashboard-layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './presentation/pages/dashboard-home/dashboard-home';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {
        path: 'dashboard',
        component: DashboardLayout,
        children: [
             { path: '', redirectTo: 'home', pathMatch: 'full' },
             { path: 'home', component: DashboardHome },
             { path: 'clasificacion', loadComponent : () => import('./presentation/pages/classifications/classifications').then(m => m.Classifications) },
             //tipo de residuo
             { path: 'tipo-residuo', loadComponent : () => import('./presentation/pages/types/types').then(m => m.Types) },
             //unidades de medida
             { path: 'unidades-medida', loadComponent : () => import('./presentation/pages/units/units').then(m => m.Units) },
             {path: 'unidades-medida/agregar', loadComponent : () => import('./presentation/pages/units/add-unit/add-unit').then(m => m.AddUnit) },
             //registro residuos:waste
             { path: 'registro-residuos', loadComponent : () => import('./presentation/pages/waste/waste').then(m => m.Waste) },
             //roles
             {path: 'roles', loadComponent : () => import('./presentation/pages/roles/roles').then(m => m.Roles) },
             //usuarios: users
             {path: 'usuarios', loadComponent : () => import('./presentation/pages/users/users').then(m => m.Users) },
             //agregar usuario
             {path: 'usuarios/agregar', loadComponent : () => import('./presentation/pages/users/add-user/add-user').then(m => m.AddUser) },
        ]
        
    }
];
