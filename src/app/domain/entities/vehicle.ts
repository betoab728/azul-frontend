export interface VehiculoCreate {
  placa: string;
  marca?: string;
  modelo?: string;
  anio_fabricacion?: number;
  capacidad_toneladas?: number;
  estado?: string;
  observaciones?: string;
  id_tipo_vehiculo: string;

  // archivos (coinciden con el backend)
  tarjeta_propiedad?: File;
  certificado_itv?: File;
  soat?: File;
  tarjeta_circulacion?: File;
}
  
  /*export interface VehiculoList {
    id: string;
    placa: string;
    marca: string;
    modelo?: string;
    anio_fabricacion?: number;
    capacidad_toneladas?: number;
    estado: string;
    observaciones?: string;
    tipo_vehiculo?: string; // opcional: si luego haces JOIN con nombre del tipo
    created_at: string;
  }*/
    export interface VehiculoList {
      id: string;
      placa: string;
      marca: string;
      modelo?: string;
      anio_fabricacion?: number;
      capacidad_toneladas?: number;
      estado: string;
      observaciones?: string;
      tipo_vehiculo: string; // ya no opcional, el backend siempre lo envía
  
    }

  export interface VehiculoData {
    id: string;
    placa: string;
    marca?: string;
    modelo?: string;
    anio_fabricacion?: number;
    capacidad_toneladas?: number;
    estado: string;
    observaciones?: string;
    created_at: string;
    updated_at: string;
  }

  //vehiculo con tipo

  export interface VehiculoConTipo {
    id: string;
    placa: string;
    marca?: string;
    modelo?: string;
    anio_fabricacion?: number;
    capacidad_toneladas?: number;
    estado: string;
    observaciones?: string;
    tipo_vehiculo: string; // nombre del tipo de vehículo
    //urls de documentos
    url_tarjeta_propiedad?: string;
    url_certificado_itv?: string;
    url_soat?: string;
    url_tarjeta_circulacion?: string;
  }
  
  export interface VehiculoResponse {
    mensaje: string;
    data: VehiculoData;
  }