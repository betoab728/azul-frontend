import Swal from 'sweetalert2';

export class SwalService {
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

  static success(message: string) {
    Swal.fire('Éxito', message, 'success');
  }

  static error(message: string) {
    Swal.fire('Error', message, 'error');
  }

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
}
