import { Grid, Paper, TextField, Box, Hidden, Divider } from "@mui/material";
import { useStyles } from "../Estilos/MakeStyles/StylesSite";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import { useFormik } from "formik";
import { ModelFornecedor } from "../Models/ModelFornecedor";
import { schemaValidacaoEditarFornecedor } from "../Constantes/SchemasDeValidacao";
import { formatarCnpj, mascaraTelefone } from "../Utils/Validacoes/Mascaras";
import ExibirResumoEndereco from "../Componentes/Modais/ExibirResumoEndereco";
import { useEffect, useState } from "react";
import { getDataEdit } from "../Routes/getRoutes";
import { useNavigate, useParams } from "react-router-dom";
import { putData } from "../Routes/putRoutes";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";
import { FornecedorPost } from "../Interfaces/Fornecedor";
import { Endereco } from "../Models/ModelEndereco";

export default function EditarFornecedor() {
    const classes = useStyles();
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [endereco, setEndereco] = useState(new Endereco());


    useEffect(() => {
        const fecthData = async () => {
            var obterFornecedor = new Array<FornecedorPost>();
            try {
                obterFornecedor = await getDataEdit('fornecedoredit', id);
                console.log(obterFornecedor);
                var fornecedor = obterFornecedor[0];
                validacao.setValues(fornecedor);
                setEndereco({
                    ID_endereco: fornecedor.ID_endereco,
                    cep: fornecedor.cep,
                    cidade: fornecedor.cidade,
                    bairro: fornecedor.bairro,
                    rua: fornecedor.rua,
                    uf: fornecedor.uf,
                    referencia: fornecedor.referencia,
                    numero: fornecedor.numero,
                    FK_fornecedor: fornecedor.fk_fornecedor,
                    FK_pessoa: fornecedor.fk_pessoa
                })
                
            } catch (error) {
            }
        };
        fecthData();
    }, []);


    const validacao = useFormik({
        initialValues: new ModelFornecedor(),
        validationSchema: schemaValidacaoEditarFornecedor,
        onSubmit: (values) => {
            atualizaForencedor(values)
        },
    })


    const atualizaForencedor= async ( fornecedor: FornecedorPost) => {
        setLoading(true);
        var retorno = await putData('fornecedor', fornecedor);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Dados do fornecedor atualizado com sucesso!", confirmacao: true, abrir: true });
        } else {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
        }
    }


    const fecharModal = (sucesso: boolean) => {
        if (sucesso) {
            navigate(0);
        } else {
            setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
        }
    }

 

    return (
        <div>
            <form onSubmit={validacao.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={12}>
                        <h2>
                            Editar Fornecedor
                        </h2>
                    </Grid>
                    <Hidden lgDown>
                        <Grid item lg={6} className="botoes-acao">
                            <div>
                                {BotoesDeAcao("/fornecedores")}
                            </div>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Paper variant="outlined">
                            <Box p={3}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <p className="titulo-cards">DADOS EMPRESARIAIS</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoCnpj"
                                            label={"CNPJ"}
                                            name={"cnpj"}
                                            value={formatarCnpj(validacao.values.cnpj)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.cnpj && Boolean(validacao.errors.cnpj)}
                                            helperText={validacao.touched.cnpj && validacao.errors.cnpj}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoRazaoSocial"
                                            label={"Razão Social"}
                                            name={"razao_social"}
                                            value={validacao.values.razao_social}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.razao_social && Boolean(validacao.errors.razao_social)}
                                            helperText={validacao.touched.razao_social && validacao.errors.razao_social}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoEmail"
                                            label={"E-mail"}
                                            name={"email"}
                                            value={validacao.values.email}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.email && Boolean(validacao.errors.email)}
                                            helperText={validacao.touched.email && validacao.errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoTelefone"
                                            label={"Telefone"}
                                            name={"telefone"}
                                            value={mascaraTelefone(validacao.values.telefone)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.telefone && Boolean(validacao.errors.telefone)}
                                            helperText={validacao.touched.telefone && validacao.errors.telefone}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ExibirResumoEndereco 
                        endereco={endereco}/>
                    </Grid>
                    <Hidden lgUp>
                        <Grid item xs={12}>
                            <div className="alinhar-fim">
                                {BotoesDeAcao("/fornecedores")}
                            </div>
                        </Grid>
                    </Hidden>
                </Grid>
            </form>
            <ModalEnvioConfirmado
                mensagem={modalConfirmacao.mensagem}
                abrir={modalConfirmacao.abrir}
                confirmacao={modalConfirmacao.confirmacao}
                fecharModal={fecharModal}
            ></ModalEnvioConfirmado>
            <ModalLoading abrir={ativarLoading}></ModalLoading>
        </div >

    )
}
