import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { Dashboard } from './presentation/pages/dashboard/dashboard';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    { path: 'dashboard', component: Dashboard },
];
