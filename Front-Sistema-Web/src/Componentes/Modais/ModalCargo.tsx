import { Dialog, DialogActions, DialogContent, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { schemaValidacaoCargo } from "../../Constantes/SchemasDeValidacao";
import { propsPadraoModal } from "../../Interfaces/Modais";
import { useState } from "react";
import { postData } from "../../Routes/postRoutes";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import ModalHeader from "./ModalHeader";
import { Cargo } from "../../Models/ModelUsuario";

export default function ModalCargo(props: propsPadraoModal) {
    const classes = useStyles();
    const [ativarLoading, setLoading] = useState(false);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            window.location.reload();
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const validacao = useFormik({
        initialValues: new Cargo(),
        validationSchema: schemaValidacaoCargo,
        onSubmit: (values) => {
            salvarCargo(values);
        },
    })

    const salvarCargo = async (cargo: Cargo) => {
        setLoading(true);
        cargo.data_available = true;
        var retorno = await postData('cargo', cargo);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Cargo cadastrado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    return (
        <>
            <Dialog
                open={props.abrir || false}
                className={classes.modalEspacamento}
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ModalHeader titulo={"Cadastrar Cargo"} fecharModal={props.fecharModal}/>
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Nome cargo"}
                                    name={"cargo"}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.cargo && Boolean(validacao.errors.cargo)}
                                    helperText={validacao.touched.cargo && validacao.errors.cargo}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={validacao.submitForm} autoFocus>
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ModalEnvioConfirmado
                mensagem={modalConfirmacao.mensagem}
                abrir={modalConfirmacao.abrir}
                confirmacao={modalConfirmacao.confirmacao}
                fecharModal={fecharModal}
            ></ModalEnvioConfirmado>
            <ModalLoading abrir={ativarLoading}></ModalLoading>

        </>
    );
}