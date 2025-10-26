
export interface CotizacionCreate {
    id_solicitud: string;
    forma_pago: string;
    fecha_emision: string;   // formato 'YYYY-MM-DD'
    id_estado_cotizacion: string;
    observaciones: string;
    pdf_file: File;
    id_vehiculo: string;
  }
  
  export interface CotizacionResponse {
    mensaje: string;
    data: {
      id: string;
      id_solicitud: string;
      forma_pago: string;
      id_estado_cotizacion: string;
      pdf_url: string;
      fecha_emision: string;
      observaciones: string;
      created_at: string;
      updated_at: string;
    };
  }

  export interface CotizacionList {
    id: string;
    fecha_cotizacion: string;
    hora_cotizacion: string;
    fecha_solicitud: string;
    empresa: string;
    estado: string;
    observaciones: string;
    pdf_url: string;
  }