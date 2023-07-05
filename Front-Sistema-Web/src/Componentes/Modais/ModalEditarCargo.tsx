import { Dialog, DialogActions, DialogContent, Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { schemaValidacaoCargo } from "../../Constantes/SchemasDeValidacao";
import { useEffect, useState } from "react";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import EditIcon from '@mui/icons-material/Edit';
import { propsCargo } from "../../Interfaces/Modais";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import ModalHeader from "./ModalHeader";

export default function ModalEditarCargo(props: propsCargo) {
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
        initialValues: props.cargo,
        validationSchema: schemaValidacaoCargo,
        onSubmit: (values) => {
            console.log(values)
            salvarCargo(values);
        },
    })

    const salvarCargo = async (cargo: any) => {
        setLoading(true);
        // var retorno = await postData('cargo', cargo);
        // if (retorno === 200) {
        //     setLoading(false);
        //     setModalConfirmacao({ mensagem: "Cargo cadastrada com sucesso!", confirmacao: true, abrir: true });
        // } else {
        //     setLoading(false);
        //     setModalConfirmacao({ mensagem: "Cargo, ocorreu um erro!", confirmacao: false, abrir: true });
        // }
    }

    useEffect(() => {
        const fecthData = async () => {
            try {       
                validacao.setValues(props.cargo);
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
                <ModalHeader titulo={"Editar Cargo"} fecharModal={fechar}/>
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Nome cargo"}
                                    name={"cargo"}
                                    value={validacao.values.cargo}
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