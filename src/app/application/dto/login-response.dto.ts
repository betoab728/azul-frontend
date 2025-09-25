export interface LoginResponseDto {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    nombre: string;
    correo: string;
    id_generador: string;
    ruc?: string;
    razon_social?: string;
  };
}