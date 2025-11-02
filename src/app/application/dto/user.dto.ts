//dto para usuario
//crear usuario: nombre,correo,clave,id_rol
export interface CreateUserDto {
    nombre: string;
    correo: string;
    clave: string;
    id_rol: string;
    id_generador: string;
}
//actualizar: el id se asume que se pasa como parte de la URL,estado si es necesario
export interface UpdateUserDto {
  nombre?: string;
  correo?: string;
  clave?: string;
  id_rol?: string;
  estado?: number; // '0' para inactivo, '1' para activo
}

export interface UserReadDto {
  id: string;
  nombre: string;
  correo: string;
  id_rol: string;
  estado: number; // podría ser '0' o '1', o lo puedes mapear a boolean si prefieres
  created_at?: string;
  updated_at?: string;
}

export interface UserWithRoleDto {
  id: string;
  nombre: string;
  correo: string;
  nombre_rol: string; // nombre del rol
  estado: number;
  created_at?: string;
}

export interface LoginResponseDto {
  access_token: string;
  token_type: string;
  user: UserLoginResponseDto;
}

export interface UserLoginResponseDto {
  id: string;
  nombre: string;
  correo: string;
  id_generador: string;
  ruc?: string;
  razon_social: string;
  rol: string;
}

