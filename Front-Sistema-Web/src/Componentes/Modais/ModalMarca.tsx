import { Dialog, DialogActions, DialogContent, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { schemaValidacaoMarca } from "../../Constantes/SchemasDeValidacao";
import { Marca } from "../../Models/ModelProduto";
import { propsPadraoModal } from "../../Interfaces/Modais";
import { useState } from "react";
import { postData } from "../../Routes/postRoutes";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import ModalHeader from "./ModalHeader";

export default function ModalMarca(props: propsPadraoModal) {
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
        initialValues: new Marca(),
        validationSchema: schemaValidacaoMarca,
        onSubmit: (values) => {
            salvarMarca(values);
        },
    })

    const salvarMarca = async (marca: any) => {
        setLoading(true);
        var retorno = await postData('marca', marca);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Marca cadastrada com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Marca, ocorreu um erro!", confirmacao: false, abrir: true });
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
                <ModalHeader titulo={"Cadastrar Marca"} fecharModal={props.fecharModal}/>
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    id="campoNome"
                                    label={"Nome marca"}
                                    name={"nome_marca"}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.nome_marca && Boolean(validacao.errors.nome_marca)}
                                    helperText={validacao.touched.nome_marca && validacao.errors.nome_marca}
                                />
                            </Grid>
                            <Grid item xs={12} md={8} lg={8}>
                                <TextField
                                    fullWidth
                                    id="campoNacionalidade"
                                    label={"Nacionalidade"}
                                    name={"nacionalidade"}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.nacionalidade && Boolean(validacao.errors.nacionalidade)}
                                    helperText={validacao.touched.nacionalidade && validacao.errors.nacionalidade}
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