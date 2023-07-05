import { Paper } from "@mui/material";
import { useState } from "react";
import { carregarImagemPersonalizacao } from "../../Utils/Tools";

export default function ImagemDePerfil(props: any){

    return(
        <Paper variant="outlined">
        <div className="espacamento-interno-box">
            <img className="avatar" alt="Foto de perfil" src={props.fotoPerfil}></img>
            <div className="adicionar-imagem">
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="carregar-foto"
                    multiple
                    type="file"
                    onChange={(e) => carregarImagemPersonalizacao(e, props.setFotoPerfil, props.setFotoArquivo)}
                />
                <label htmlFor="carregar-foto">
                    (opcional) Foto de Perfil +
                </label>
            </div>
        </div>
    </Paper>
    )
}