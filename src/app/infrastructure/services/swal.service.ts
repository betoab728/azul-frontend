import Swal from 'sweetalert2';
export class SwalService {
  // ✅ Éxito
  static success(message: string) {
    Swal.fire('Éxito', message, 'success');
  }

  // ✅ Error
  static error(message: string) {
    Swal.fire('Error', message, 'error');
  }

  // ✅ Confirmación
  static confirm(message: string): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then(result => result.isConfirmed);
  }


  // ✅ Input simple (1 campo)
  static async inputPrompt(title: string, placeholder: string = ''): Promise<string | null> {
    const { value } = await Swal.fire({
      title,
      input: 'text',
      inputPlaceholder: placeholder,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar'
    });

    return value ? value.trim() : null;
  }

  // ✅ Input doble (nombre y descripción)
  static async roleInputPrompt(): Promise<{ nombre: string; descripcion: string } | null> {
    const { value: formValues } = await Swal.fire({
      title: 'Nuevo Rol',
      html:
        `<input id="swal-input-nombre" class="swal2-input" placeholder="Nombre">` +
        `<input id="swal-input-desc" class="swal2-input" placeholder="Descripción">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input-nombre') as HTMLInputElement)?.value;
        const descripcion = (document.getElementById('swal-input-desc') as HTMLInputElement)?.value;
        if (!nombre || !descripcion) {
          Swal.showValidationMessage('Debe completar ambos campos');
          return null;
        }
        return { nombre: nombre.trim(), descripcion: descripcion.trim() };
      }
    });

    return formValues || null;
  }

  
}