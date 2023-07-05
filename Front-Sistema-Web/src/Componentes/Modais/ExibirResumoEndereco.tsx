import { Box, Grid, Paper, Typography } from "@mui/material";
import ModalEndereco from "./ModalEndereco";
import { useFormik } from 'formik'; 
import { Endereco } from '../../Models/ModelEndereco';
import { schemaValidacaoEndereco } from '../../Constantes/SchemasDeValidacao';
import { useEffect, useState } from "react";

export default function  ExibirResumoEndereco(endereco: any) {

    const validacao = useFormik({
        initialValues: new Endereco(),
        validationSchema: schemaValidacaoEndereco,
        onSubmit: (values) => {

        }
    })

    useEffect(() => {
        validacao.setValues(endereco.endereco);
        console.log(endereco.endereco);
    }, [endereco]);

    return (
        <Paper variant="outlined">
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <p className="titulo-cards">ENDEREÇO</p>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper elevation={3} sx={{ display: "flex" }}>
                            <Box p={3} sx={{ width: '80%' }}>
                                <Typography>{validacao.values.cep}</Typography>
                                <Typography>{validacao.values.rua}, {validacao.values.numero}</Typography>
                                <Typography>{validacao.values.bairro}</Typography>
                                <Typography>{validacao.values.cidade} - {validacao.values.uf}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', marginLeft: "auto" }}>
                                <ModalEndereco 
                                endereco={endereco}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    )
}