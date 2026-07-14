export interface BlogResponseDto {
    id: number;
    titulo: string;
    slug: string;
    resumen: string;
    contenido: string;
    imagen_portada: string;
    autor: string;
    estado: string;
    fecha_publicacion: string | null;
    created_at: string;
    updated_at: string;
}
