import { Dialog, DialogActions, DialogContent, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { schemaValidacaoCategoria } from "../../Constantes/SchemasDeValidacao";
import { propsCategoria, propsPadraoModal } from "../../Interfaces/Modais";
import { useEffect, useState } from "react";
import { postData } from "../../Routes/postRoutes";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import ModalHeader from "./ModalHeader";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import EditIcon from '@mui/icons-material/Edit';
import { putData } from "../../Routes/putRoutes";

export default function ModalEditarCategoria(props: propsCategoria) {
    const classes = useStyles();
    const [abrir, setAbrir] = useState(false);
    const [ativarLoading, setLoading] = useState(false);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });

    const fechar = () => {
        setAbrir(false);
    }

    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            window.location.reload();
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const validacao = useFormik({
        initialValues: props.categoria,
        validationSchema: schemaValidacaoCategoria,
        onSubmit: (values) => {
            console.log(values);
            salvarCategoria(values)
        },
    });


    const salvarCategoria = async (categoria: any) => {
        setLoading(true);
        var retorno = await putData('categoria', categoria);
        if (retorno === 200) {
             setLoading(false);
             setModalConfirmacao({ mensagem: "Categoria cadastrada com sucesso!", confirmacao: true, abrir: true });
        }  else {
            setLoading(false);
             setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {       
                validacao.setValues(props.categoria);
            } catch (error) {
            }
        };
        fecthData();
    }, []);

    return (
        <>
            <EditIcon onClick={() => setAbrir(true)} className="tamanho-icone"></EditIcon>
            <Dialog
                open={abrir}
                maxWidth="md"
                className={classes.modalEspacamento}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ModalHeader titulo={"Editar Categoria"} fecharModal={fechar} />
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={8} lg={12}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Nome da Categoria"}
                                    name={"categoria"}
                                    value={validacao.values.categoria}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.categoria && Boolean(validacao.errors.categoria)}
                                    helperText={validacao.touched.categoria && validacao.errors.categoria}
                                />
                            </Grid>
                            <Grid item xs={12} md={4} lg={12}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Descrição"}
                                    name={"desc_categoria"}
                                    value={validacao.values.desc_categoria}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.desc_categoria && Boolean(validacao.errors.desc_categoria)}
                                    helperText={validacao.touched.desc_categoria && validacao.errors.desc_categoria}
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