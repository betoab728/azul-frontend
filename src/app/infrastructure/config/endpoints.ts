//import { environment } from 'src/environments/environment.prod'
import { environment } from 'src/environments/environment'

export const endpoints = {
    login: `${environment.apiUrl}/auth/login`,
    classifications: `${environment.apiUrl}/clasificaciones`,
    roles: `${environment.apiUrl}/roles`,
    users: `${environment.apiUrl}/usuarios`,
    userswithRoles: `${environment.apiUrl}/usuarios/con-rol`,
    units: `${environment.apiUrl}/unidad_medida`,
    types: `${environment.apiUrl}/tipos-residuos`,
    waste: `${environment.apiUrl}/registro-residuos`,
    generator: `${environment.apiUrl}/generador-residuos`,
    departments: `${environment.apiUrl}/ubigeo/departamentos`,
    provinces: `${environment.apiUrl}/ubigeo/provincias/`,
    districts: `${environment.apiUrl}/ubigeo/distritos/`,
    boats: `${environment.apiUrl}/embarcaciones`,
    boatTypes: `${environment.apiUrl}/tipos-embarcacion`,
    requests: `${environment.apiUrl}/solicitudes`,
    requestsGenerator: `${environment.apiUrl}/solicitudes/generador`,
    ports: `${environment.apiUrl}/puertos/`,
    status: `${environment.apiUrl}/estados-solicitud`,
    requestDetail: `${environment.apiUrl}/detalles-solicitud`,
    quotes: `${environment.apiUrl}/cotizaciones/`,
    files: `${environment.apiUrl}/archivos`,
    vehicles: `${environment.apiUrl}/vehiculos/`,
    vehiclesDetailed: `${environment.apiUrl}/vehiculos/detallado`,
    vehiclestypes: `${environment.apiUrl}/tipos-vehiculo/`,
    orders: `${environment.apiUrl}/ordenes/`,
    traceability: `${environment.apiUrl}/trazabilidad/`

  };