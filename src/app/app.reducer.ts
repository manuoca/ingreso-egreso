import { ActionReducerMap } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer'


export interface AppState {
   ui: fromUi.State;
   user: fromAuth.State;
   ingresosEgresos: fromingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: fromUi.uiReducer,
   user: fromAuth.authReducer,
   ingresosEgresos: fromingresoEgreso.ingresoEgresoReducer,
};
