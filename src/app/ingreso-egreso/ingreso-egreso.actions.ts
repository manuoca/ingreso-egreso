import { createAction, props } from '@ngrx/store';
import { IngresosEgreso } from '../models/ingresos-egresos.model';

export const unsetItems = createAction('[IngresoEgreso] Unset Items');
export const setItems = createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: IngresosEgreso[] }>()
);
