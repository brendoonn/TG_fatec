import { createSlice } from '@reduxjs/toolkit';

interface TemaState {
    logoEscuro: string;
    logoClaro: string;
    logoPadraoEscuro: string;
    logoPadraoClaro: string;
    nomeFantasia: string;
}

const initialState: TemaState = {
    logoEscuro: "",
    logoClaro: "",
    logoPadraoClaro: "/Imagens/logo-branco-195x70.png",
    logoPadraoEscuro: "/Imagens/logo-preto-195x76.png",
    nomeFantasia: ""
};

export const definirTema = createSlice({
    name: 'temaSistema',
    initialState: initialState,
    reducers: {
        armazenar: (state, action) => {
            state.logoEscuro = action.payload.logoEscuro;
            state.logoClaro = action.payload.logoClaro;
            state.logoPadraoEscuro = action.payload.logoPadraoEscuro;
            state.logoPadraoClaro = action.payload.logoPadraoClaro;
            state.nomeFantasia = action.payload.nomeFantasia;
        },
    }
});

export const { armazenar } = definirTema.actions
export const armazenarTemaReducer = definirTema.reducer;