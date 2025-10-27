
export interface OrdenEncabezado {
    fecha: string;
    serie: string;
    numero: string;
    razon_social: string;
  }

//para listar las ordenes
export interface OrdenListado {
    id: string;
    fecha: string;
    hora: string;
    serie: string;
    numero: string;
    observaciones: string;
    razon_social: string;
    pdf_url: string;
}

export interface OrdenResponse {
    mensaje: string;
    data: {
      id: string;
      fecha: string;
      serie: string;
      numero: string;
      observaciones: string;
      id_cotizacion: string;
      pdf_url: string;
      created_at: string;
    };
}
//crear orden
export interface OrdenCreate {
    id_cotizacion: string;
    observaciones: string;
    pdf_file: File;
}

//respuesta al crear orden
export interface OrdenCrearResponse {
    mensaje: string;
    data: {
      fecha: string;
      serie: string;
      observaciones: string;
      id_cotizacion: string;
      updated_at: string;
      id: string; 
      numero: string;
      pdf_url: string;
      created_at: string;
    };
}