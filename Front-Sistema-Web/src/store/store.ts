import {configureStore} from '@reduxjs/toolkit';
import { autenticarReducer } from '../features/Autenticacao/autenticacao-slice';
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import {combineReducers} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { armazenarTemaReducer } from '../features/TemaSistema/tema-slice';

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    autenticar: autenticarReducer,
    definirTema: armazenarTemaReducer
})

const peristedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: peristedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


type GetStateType = typeof store.getState

export type RootState = ReturnType<GetStateType>