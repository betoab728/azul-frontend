export interface Blog {
    id: number;
    titulo: string;
    slug: string;
    resumen: string;
    contenido: string;
    imagenPortada: string;
    autor: string;
    estado: string;
    fechaPublicacion: string | null;
    createdAt: string;
    updatedAt: string;
}
