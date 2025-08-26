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