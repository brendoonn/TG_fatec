import Button from '@mui/material/Button';
import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import { Dialog, DialogActions, DialogContent, Grid, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useFormik } from 'formik'; 
import { Endereco } from '../../Models/ModelEndereco';
import { schemaValidacaoEndereco } from '../../Constantes/SchemasDeValidacao';
import ModalHeader from './ModalHeader';
import { buscarCep, validarCamposEndereco } from '../../Utils/Validacoes/Validacoes';
import EditIcon from '@mui/icons-material/Edit';
import ModalEnvioConfirmado from './ModalEnvioConfirmado';
import ModalLoading from './ModalLoading';
import { putData } from '../../Routes/putRoutes';
import { useNavigate } from 'react-router';

export default function ModalEndereco(props: any) {
    const classes = useStyles();
    const [abrir, setAbrir] = useState(false);
    const fecharModal = () => setAbrir(false);
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: '', });
    const navigate = useNavigate();

    const validacao = useFormik({
        initialValues: new Endereco(),
        validationSchema: schemaValidacaoEndereco,
        onSubmit: (values) => {
            console.log(values)
            atualizaEndereco(values)
        }
    })

    const fecharModalConformiacao = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

    const atualizaEndereco = async (endereco: any) => {
        setLoading(true);
        var retorno = await putData("attendereco", endereco);

        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Endereço atualizado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro ao tentar atualizar seu endereço!", confirmacao: false, abrir: true });
        }
    }





    const abrirModal = () => {
        validacao.setValues(props.endereco.endereco);
        setAbrir(true);
    }

    return (
        <>

            <IconButton onClick={abrirModal}><EditIcon></EditIcon></IconButton>
            <Dialog
                open={abrir}
                maxWidth="md"
                className={classes.modalEspacamento}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ModalHeader titulo={"Editar Endereço"} fecharModal={fecharModal} />
                <form onSubmit={validacao.handleSubmit}>
                    <DialogContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={4} lg={4}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"CEP"}
                                    name={"cep"}
                                    inputProps={{ maxLength: 9 }}
                                    value={validacao.values.cep}
                                    onChange={(e) => buscarCep(e.target.value, validacao, setErros)}
                                    error={validacao.touched.cep && Boolean(validacao.errors.cep)}
                                    helperText={validacao.touched.cep && validacao.errors.cep}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} lg={2}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"UF"}
                                    name={"uf"}
                                    inputProps={{ maxLength: 2 }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={validacao.values.uf}
                                    onChange={validacao.handleChange}
                                    error={erros.uf}
                                    helperText={erros.uf ? "O campo é obrigatório" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Cidade"}
                                    name={"cidade"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={validacao.values.cidade}
                                    onChange={validacao.handleChange}
                                    error={erros.cidade}
                                    helperText={erros.cidade ? "O campo é obrigatório" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Rua"}
                                    name={"rua"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={validacao.values.rua}
                                    onChange={validacao.handleChange}
                                    error={erros.rua}
                                    helperText={erros.rua ? "O campo é obrigatório" : ""}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} lg={4}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Bairro"}
                                    name={"bairro"}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    value={validacao.values.bairro}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.bairro && Boolean(validacao.errors.bairro)}
                                    helperText={validacao.touched.bairro && validacao.errors.bairro}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2} lg={2}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Numero"}
                                    name={"numero"}
                                    value={validacao.values.numero}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.numero && Boolean(validacao.errors.numero)}
                                    helperText={validacao.touched.numero && validacao.errors.numero}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} lg={6}>
                                <TextField
                                    fullWidth
                                    id="demo-helper-text-aligned-no-helper"
                                    label={"Complemento"}
                                    name={"complemento"}
                                    value={validacao.values.referencia}
                                    onChange={validacao.handleChange}
                                    error={validacao.touched.referencia && Boolean(validacao.errors.referencia)}
                                    helperText={validacao.touched.referencia && validacao.errors.referencia}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" onClick={() => validarCamposEndereco(setErros, validacao)} autoFocus>
                            Salvar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ModalEnvioConfirmado
                mensagem={modalConfirmacao.mensagem}
                abrir={modalConfirmacao.abrir}
                confirmacao={modalConfirmacao.confirmacao}
                fecharModal={fecharModalConformiacao}
            ></ModalEnvioConfirmado>
            <ModalLoading abrir={ativarLoading}></ModalLoading>
        </>
    );
}
