export interface Departamento {
    id: number;
    nombre: string;
  }
  
  export interface Provincia {
    id: number;
    nombre: string;
    idDepartamento?: number; // si necesitas referencia
  }
  
  export interface Distrito {
    id: number;
    nombre: string;
    idProvincia?: number; // si necesitas referencia
  }