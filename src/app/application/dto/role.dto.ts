export interface CreateRoleDto {
    nombre: string;
    descripcion: string;
  }

  export interface UpdateRoleDto {
    nombre: string;
    descripcion: string;
  }

  export interface RoleReadDto {
    id: number;
    nombre: string;
    descripcion: string;
    created_at?: string;
    updated_at?: string;
  }