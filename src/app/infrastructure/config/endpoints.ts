import { environment } from './environment'

export const endpoints = {
    login: `${environment.apiUrl}/auth/login/`,
    classifications: `${environment.apiUrl}/clasificaciones/`,
    roles: `${environment.apiUrl}/roles/`,
    users: `${environment.apiUrl}/usuarios`,
    userswithRoles: `${environment.apiUrl}/usuarios/con-rol/`,
    units: `${environment.apiUrl}/unidad_medida/`,
    types: `${environment.apiUrl}/tipos-residuos/`,
    waste: `${environment.apiUrl}/registro-residuos/`,

  };