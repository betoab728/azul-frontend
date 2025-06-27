export interface Classification {
    id: number;
    nombre: string;
    estado: number; // 1: activo, 0: inactivo;
    created_at?: string;  // opcional
    updated_at?: string;  // opcional
  }