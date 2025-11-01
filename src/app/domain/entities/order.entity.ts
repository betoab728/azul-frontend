
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

export interface OrdenDocumentos {
    id: string;
    id_orden: string;
    guia_remision_url: string | null;
    factura_url: string | null;
    guia_transportista_url: string | null;
    informe_url: string | null;
    manifiesto_url: string | null;
    certificado_url: string | null;
    fecha_registro: string;
}