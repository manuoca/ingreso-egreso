import { createReducer, on } from '@ngrx/store';
import * as fromAuth from './auth.actions';
import { Usuario } from '../models/usuario.model';

export interface State {
    user: Usuario;
}

export const initialState: State = {
   user: null,
}

const reducer = createReducer(initialState,

    on(fromAuth.setUser, (state, { user }) => ({ ...state, user: {...user} })),
    on(fromAuth.unsetUser, (state) => ({ ...state, user: null })),

);

export function authReducer(state, action) {
    return reducer(state, action);
}