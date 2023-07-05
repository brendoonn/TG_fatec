import { Grid, Paper, TextField, Box, Hidden, Divider } from "@mui/material";
import { useStyles } from "../Estilos/MakeStyles/StylesSite";
import { BotoesDeAcao } from "../Componentes/Geral/BotoesDeAcao";
import { schemaValidacaoEditarCliente } from "../Constantes/SchemasDeValidacao";
import { ModelCliente } from "../Models/ModelCliente";
import { useFormik } from "formik";
import { formatarCpf, formatarDataParaEstiloAmericano, formatarDataParaEstiloBrasileiro, mascaraData, mascaraTelefone } from "../Utils/Validacoes/Mascaras";
import ExibirResumoEndereco from "../Componentes/Modais/ExibirResumoEndereco";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDataEdit } from "../Routes/getRoutes";
import { putData } from "../Routes/putRoutes";
import { ClientePost } from "../Interfaces/Cliente";
import { Endereco } from "../Models/ModelEndereco";
import ModalEnvioConfirmado from "../Componentes/Modais/ModalEnvioConfirmado";
import ModalLoading from "../Componentes/Modais/ModalLoading";

export default function EditarCliente() {
    const classes = useStyles();
    const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
    const [ativarLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [endereco, setEndereco] = useState(new Endereco());

    useEffect(() => {
        const fecthData = async () => {
            console.log(id)
            var obterCliente = new Array<ClientePost>();
            try {
                obterCliente = await getDataEdit('clienteedit', id);
                var cliente = obterCliente[0];
                cliente.data_nascimento = formatarDataParaEstiloBrasileiro(cliente.data_nascimento);
                console.log(cliente);
                validacao.setValues(cliente);
                setEndereco({
                    ID_endereco: cliente.ID_endereco,
                    cep: cliente.cep,
                    cidade: cliente.cidade,
                    bairro: cliente.bairro,
                    rua: cliente.rua,
                    uf: cliente.uf,
                    referencia: cliente.referencia,
                    numero: cliente.numero,
                    FK_fornecedor: cliente.fk_fornecedor,
                    FK_pessoa: cliente.ID_pessoa
                })
            } catch (error) {
            }
        };
        fecthData();
    }, []);


    const validacao = useFormik({
        initialValues: new ModelCliente(),
        validationSchema: schemaValidacaoEditarCliente,
        onSubmit: (values) => {
            console.log(values)
            atualizaForencedor(values)
        },
    })


    const atualizaForencedor = async (cliente: ClientePost) => {
        setLoading(true);
        cliente.data_nascimento = formatarDataParaEstiloAmericano(cliente.data_nascimento)
        var retorno = await putData('editcliente', cliente);
        if (retorno === 200) {
            setLoading(false);
            setModalConfirmacao({ mensagem: "Dados do cliente atualizados com sucesso!", confirmacao: true, abrir: true });
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
        <>
            <form onSubmit={validacao.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item lg={6} xs={12}>
                        <h2>
                            Editar Cliente
                        </h2>
                    </Grid>
                    <Hidden lgDown>
                        <Grid item lg={6} className="botoes-acao">
                            <div>
                                {BotoesDeAcao("/clientes")}
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
                                        <p className="titulo-cards">DADOS PESSOAIS</p>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoNome"
                                            label={"Nome"}
                                            name={"nome"}
                                            value={validacao.values.nome}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.nome && Boolean(validacao.errors.nome)}
                                            helperText={validacao.touched.nome && validacao.errors.nome}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoSobrenome"
                                            label={"Sobrenome"}
                                            name={"sobrenome"}
                                            value={validacao.values.sobrenome}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.sobrenome && Boolean(validacao.errors.sobrenome)}
                                            helperText={validacao.touched.sobrenome && validacao.errors.sobrenome}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoCpf"
                                            label={"CPF"}
                                            name={"cpf"}
                                            inputProps={{ maxLength: 14 }}
                                            value={formatarCpf(validacao.values.cpf)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.cpf && Boolean(validacao.errors.cpf)}
                                            helperText={validacao.touched.cpf && validacao.errors.cpf}
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
                                            label={"Celular"}
                                            name={"celular"}
                                            value={mascaraTelefone(validacao.values.celular)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.celular && Boolean(validacao.errors.celular)}
                                            helperText={validacao.touched.celular && validacao.errors.celular}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="campoData"
                                            label={"Data de Nascimento"}
                                            name={"data_nascimento"}
                                            inputProps={{ maxLength: 10 }}
                                            value={mascaraData(validacao.values.data_nascimento)}
                                            onChange={validacao.handleChange}
                                            error={validacao.touched.data_nascimento && Boolean(validacao.errors.data_nascimento)}
                                            helperText={validacao.touched.data_nascimento && validacao.errors.data_nascimento}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <ExibirResumoEndereco
                            endereco={endereco}
                        />
                    </Grid>
                    <Hidden lgUp>
                        <Grid item xs={12}>
                            <div className="alinhar-fim">
                                {BotoesDeAcao("/clientes")}
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
        </>

    )
}
