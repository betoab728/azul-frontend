export interface GeneradorResiduo {
    id?: string;
    ruc: string; 
    razonsocial: string;
    direccion?: string;
    telefono?: string;
    correo?: string;
    idDistrito?: string; 
    dniResponsable?: string; 
    nombreResponsable?: string;
    created_at?: string;
    updated_at?: string;
    estado?: string; 
    //campos de ubicacion: latitud y longitud
    latitud?: number;
    longitud?: number;

}

export interface GeneradorResiduoDetalle {
    id: string;
    ruc: string; 
    razonsocial: string;
    direccion?: string;
    distrito: string;
    dniResponsable?: string; 
    nombreResponsable?: string;
    telefono?: string;
    correo?: string;
    created_at?: string;
    estado?: string; 
}

export interface GeneradorResiduoCotizacion {
    id: string;
    ruc: string; 
    razon_social: string;
    direccion?: string;
    distrito: string;
    nombre_responsable?: string; 
    telefono?: string;
    correo?: string;
    created_at?: string;
    estado?: string; 
}