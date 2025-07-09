import { environment } from './environment'

export const endpoints = {
    login: `${environment.apiUrl}/auth/login`,
  //endpont para obtener las clasificaciones
    classifications: `${environment.apiUrl}/clasificaciones`,
    roles: `${environment.apiUrl}/roles`,
    
  };