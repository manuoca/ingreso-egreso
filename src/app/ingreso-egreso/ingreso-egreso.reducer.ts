import { createReducer, on } from '@ngrx/store';
import { setItems, unsetItems } from './ingreso-egreso.actions';
import { IngresosEgreso } from '../models/ingresos-egresos.model';

export interface State {
    items: IngresosEgreso[];
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(unsetItems, state => ({ ...state, items: [] })),
);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}