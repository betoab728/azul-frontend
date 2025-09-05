import { Injectable, signal, computed } from '@angular/core';
import { RegistroResiduoDetalle } from 'src/app/domain/entities/waste.entity';

export interface ItemCarrito {
  residuo: RegistroResiduoDetalle;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoStoreService {
  private _items = signal<ItemCarrito[]>([]);

  items = computed(() => this._items());
  totalItems = computed(() =>
    this._items().reduce((acc, item) => acc + item.cantidad, 0)
  );

  agregar(residuo: RegistroResiduoDetalle, cantidad = 1) {
    console.log('Agregando al carrito:', { residuo, cantidad });
    const existentes = this._items();
    const index = existentes.findIndex(i => i.residuo.id === residuo.id);

    if (index > -1) {
      console.log('Item ya existe en el carrito, actualizando cantidad');
      // ya existe → actualizar cantidad
      existentes[index] = {
        ...existentes[index],
        cantidad: existentes[index].cantidad + cantidad,
      };
      this._items.set([...existentes]);
    } else {
      // no existe → agregar nuevo
      console.log('Nuevo item, agregando al carrito');
      this._items.set([...existentes, { residuo, cantidad }]);
    }
  }

  actualizarCantidad(residuoId: string, cantidad: number) {
    const actualizados = this._items().map(item =>
      item.residuo.id === residuoId ? { ...item, cantidad } : item
    );
    this._items.set(actualizados);
  }

  eliminar(residuoId: string) {
    this._items.set(this._items().filter(item => item.residuo.id !== residuoId));
  }

  limpiar() {
    this._items.set([]);
  }
}
