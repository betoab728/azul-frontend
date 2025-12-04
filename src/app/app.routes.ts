import { Routes } from '@angular/router';
import { Login } from './presentation/pages/login/login';
import { DashboardLayout } from './presentation/layouts/dashboard-layout/dashboard-layout/dashboard-layout';
import { DashboardHome } from './presentation/pages/dashboard-home/dashboard-home';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: Login},
    {
        path: 'dashboard',component: DashboardLayout,
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
             {path: 'registro-residuos/agregar', loadComponent : () => import('./presentation/pages/waste/add-waste/add-waste').then(m => m.AddWaste) },
             //roles
             {path: 'roles', loadComponent : () => import('./presentation/pages/roles/roles').then(m => m.Roles) },
             //usuarios: users
             {path: 'usuarios', loadComponent : () => import('./presentation/pages/users/users').then(m => m.Users) },
             //agregar usuario
             {path: 'usuarios/agregar', loadComponent : () => import('./presentation/pages/users/add-user/add-user').then(m => m.AddUser) },
             //tipos de residuo: types
             {path: 'tipos-residuo', loadComponent : () => import('./presentation/pages/types/types').then(m => m.Types) },
             {path: 'tipos-residuo/agregar', loadComponent : () => import('./presentation/pages/types/add-type/add-type').then(m => m.AddType) },
             //generadores
             {path: 'generadores',loadComponent : () => import('./presentation/pages/generators/generators').then(m => m.Generators) },
             {path: 'generadores/agregar', loadComponent : () => import('./presentation/pages/generators/add-generator/add-generator').then(m => m.AddGenerator) },
             {path: 'solicitud/agregar', loadComponent : () => import('./presentation/pages/request/add-request/add-request').then(m => m.AddRequest) },
             {path: 'solicitud/checkout', loadComponent : () => import('./presentation/pages/request/checkout-request/checkout-request').then( m => m.CheckoutRequest ) },
             {path: 'embarcaciones', loadComponent : () => import('./presentation/pages/boats/boats').then(m => m.Embarcaciones) },
             {path: 'embarcaciones/agregar', loadComponent : () => import('./presentation/pages/boats/add-boat/add-boat').then(m => m.AddBoat) },
             {path: 'solicitudes', loadComponent : () => import('./presentation/pages/request/request').then(m => m.Request) },
             {path: 'solicitudes/generador', loadComponent : () => import('./presentation/pages/request/request-generator/request-generator').then(m => m.RequestGenerator) },
             {path:'cotizaciones', loadComponent: () => import('./presentation/pages/quotes/quotes').then(m => m.Quotes) },
             {path:'cotizaciones/generador', loadComponent: () => import('./presentation/pages/quotes/quotes-generator/quotes-generator').then(m => m.QuotesGenerator) },
             {path:'cotizaciones/agregar/:idSolicitud', loadComponent: () => import('./presentation/pages/quotes/add-quote/add-quote').then(m => m.AddQuote) },
             {path:'ordenes', loadComponent: () => import('./presentation/pages/orders/orders').then(m => m.Orders) },
             {path:'ordenes/generador', loadComponent: () => import('./presentation/pages/orders/orders-generator/orders-generator').then(m => m.OrdersGenerator) },
             {path:'ordenes/agregar/:cotizacionId', loadComponent: () => import('./presentation/pages/orders/add-order/add-order').then(m => m.AddOrder) },
             {path:'vehiculos', loadComponent: () => import('./presentation/pages/vehicles/vehicles').then(m => m.Vehicles) },
             {path:'vehiculos/agregar', loadComponent: () => import('./presentation/pages/vehicles/add-vehicle/add-vehicle').then(m => m.AddVehicle) },
             {path:'vehiculos/:id/detalle', loadComponent: () => import('./presentation/pages/vehicles/vehicle-detail/vehicle-detail').then(m => m.VehicleDetail) },
             {path :'tipos-vehiculo', loadComponent: () => import('./presentation/pages/vehicles-types/vehicles-types').then(m => m.VehiclesTypes) },
             {path :'tipos-vehiculo/agregar', loadComponent: () => import('./presentation/pages/vehicles-types/add-type/add-type').then(m => m.AddType) },
             {path: 'documentos/:id', loadComponent: () => import('./presentation/pages/quotes/documents/documents').then(m => m.DocumentsComponent) },
             {path:'ordenes', loadComponent: () => import('./presentation/pages/orders/orders').then(m => m.Orders) },
             {path:'trazabilidad/:id', loadComponent: () => import('./presentation/pages/traceability/traceability').then(m => m.Traceability) }
    
             
        ]
        
    }
];
