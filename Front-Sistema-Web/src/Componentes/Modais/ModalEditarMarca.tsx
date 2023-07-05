import { Dialog, DialogActions, DialogContent, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { schemaValidacaoMarca } from "../../Constantes/SchemasDeValidacao";
import { useEffect, useState } from "react";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import EditIcon from '@mui/icons-material/Edit';
import { propsMarca } from "../../Interfaces/Modais";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import ModalHeader from "./ModalHeader";
import { putData } from "../../Routes/putRoutes";

export default function ModalEditarMarca(props: propsMarca) {
    const classes = useStyles();
    const [abrir, setAbrir] = useState(false);
    const fechar = () =>{
        setAbrir(false);
    }
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
        initialValues: props.marca,
        validationSchema: schemaValidacaoMarca,
        onSubmit: (values) => {
            salvarMarca(values);
        },
    })

    const salvarMarca = async (marca: any) => {
        setLoading(true);
         var retorno = await putData('marca', marca);
         if (retorno === 200) {
             setLoading(false);
             setModalConfirmacao({ mensagem: "Marca atualizada com sucesso!", confirmacao: true, abrir: true });
         } else {
             setLoading(false);
             setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
         }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {       
                validacao.setValues(props.marca);
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
                <ModalHeader titulo={"Editar Marca"} fecharModal={fechar}/>
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    id="campoNome"
                                    label={"Nome marca"}
                                    name={"nome_marca"}
                                    value={validacao.values.nome_marca}
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
                                    value={validacao.values.nacionalidade}
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