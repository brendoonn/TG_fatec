import { createSlice } from '@reduxjs/toolkit';

interface AutenticarState {
    nomeUsuario: string;
    nivelAcesso: string;
    idUsuario: number;
    logado: boolean;
}

const initialState: AutenticarState = {
    nomeUsuario: "",
    nivelAcesso: "",
    idUsuario: 0,
    logado: false
};

export const autenticar = createSlice({
    name: 'autenticacao',
    initialState: initialState,
    reducers: {
        logar: (state, action) => {
            state.nomeUsuario = action.payload.nomeUsuario;
            state.nivelAcesso = action.payload.nivelAcesso;
            state.idUsuario = action.payload.idUsuario;
            state.logado = action.payload.logado;
        },
        deslogar: (state) => {
            state.nomeUsuario = "";
            state.nivelAcesso = "";
            state.idUsuario = 0;
            state.logado = false;
        }
    }
});

export const { logar, deslogar } = autenticar.actions
export const autenticarReducer = autenticar.reducer;