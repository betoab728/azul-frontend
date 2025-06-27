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
        ]
        
    }
];
