import Button from "@mui/material/Button";
import { useStyles } from "../../Estilos/MakeStyles/StylesSite";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "../../Estilos/Css/Customizacao.css";
import ModalEnvioConfirmado from "./ModalEnvioConfirmado";
import ModalLoading from "./ModalLoading";
import { ModelCliente } from "../../Models/ModelCliente";
import { useFormik } from "formik";
import { schemaValidacaoCliente } from "../../Constantes/SchemasDeValidacao";
import { formatarCpf, mascaraData, mascaraTelefone } from "../../Utils/Validacoes/Mascaras";
import ModalHeader from "./ModalHeader";
import { buscarCep, validarCamposEndereco } from "../../Utils/Validacoes/Validacoes";
import { postData } from "../../Routes/postRoutes";

export default function ModalAdicionarCliente(props: any) {
  const classes = useStyles();
  const [erros, setErros] = useState({ rua: false, uf: false, cidade: false, bairro: false, });
  const [modalConfirmacao, setModalConfirmacao] = useState({ mensagem: "", confirmacao: false, abrir: false });
  const [ativarLoading, setLoading] = useState(false);

  const fecharModal = (sucesso: boolean) => {
    if (sucesso) {
      window.location.reload();
    } else {
      setModalConfirmacao({ mensagem: "", confirmacao: false, abrir: false });
    }
  }

  const validacao = useFormik({
    initialValues: new ModelCliente(),
    validationSchema: schemaValidacaoCliente,
    onSubmit: (values) => {
      salvarCliente(values);
    },
  })

  const salvarCliente = async (produto: any) => {
    setLoading(true);
    var retorno = await postData('cadcliente', produto);
    console.log("retorno", retorno);
    if (retorno === 200) {
      setLoading(false);
      setModalConfirmacao({ mensagem: "Cliente cadastrado com sucesso!", confirmacao: true, abrir: true });
    } else {
      setLoading(false);
      setModalConfirmacao({ mensagem: "Desculpe, ocorreu um erro!", confirmacao: false, abrir: true });
    }
  }

  return (
    <>
      <Dialog
        open={props.adicionarCliente || false}
        className={classes.modalEspacamento}
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <ModalHeader titulo={"Adicionar Cliente"} fecharModal={props.fecharModal} />
        <form onSubmit={validacao.handleSubmit}>
          <DialogContent>
            <Box mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"Nome"}
                    name={"nome"}
                    onChange={validacao.handleChange}
                    error={validacao.touched.nome && Boolean(validacao.errors.nome)}
                    helperText={validacao.touched.nome && validacao.errors.nome}
                  />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"sobrenome"}
                    name={"sobrenome"}
                    onChange={validacao.handleChange}
                    error={validacao.touched.sobrenome && Boolean(validacao.errors.sobrenome)}
                    helperText={validacao.touched.sobrenome && validacao.errors.sobrenome}
                  />
                </Grid>
                <Grid item xs={12} md={4} lg={2.5}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"CPF"}
                    name={"cpf"}
                    inputProps={{ maxLength: 14 }}
                    value={formatarCpf(validacao.values.cpf)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.cpf && Boolean(validacao.errors.cpf)}
                    helperText={validacao.touched.cpf && validacao.errors.cpf}
                  />
                </Grid>
                <Grid item xs={12} md={3} lg={2}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"Data nascimento"}
                    name={"data_nascimento"}
                    value={mascaraData(validacao.values.data_nascimento)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.data_nascimento && Boolean(validacao.errors.data_nascimento)}
                    helperText={validacao.touched.data_nascimento && validacao.errors.data_nascimento}
                  />
                </Grid>
                <Grid item xs={12} md={5} lg={3}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"Celular"}
                    name={"celular"}
                    value={mascaraTelefone(validacao.values.celular)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.celular && Boolean(validacao.errors.celular)}
                    helperText={validacao.touched.celular && validacao.errors.celular}
                  />
                </Grid>
                <Grid item xs={12} lg={4.5}>
                  <TextField
                    fullWidth
                    id="demo-helper-text-aligned-no-helper"
                    label={"Email"}
                    name={"email"}
                    onChange={validacao.handleChange}
                    error={validacao.touched.email && Boolean(validacao.errors.email)}
                    helperText={validacao.touched.email && validacao.errors.email}
                  />
                </Grid>
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
                    id="uf"
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
                    id="cidade"
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
                    id="rua"
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
                    id="bairro"
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
                    id="numero"
                    label={"Número"}
                    name={"numero"}
                    onChange={validacao.handleChange}
                    error={validacao.touched.numero && Boolean(validacao.errors.numero)}
                    helperText={validacao.touched.numero && validacao.errors.numero}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                  <TextField
                    fullWidth
                    helperText=""
                    id="complemento"
                    label={"Complemento"}
                    name={"complemento"}
                    onChange={validacao.handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="submit" onClick={() => validarCamposEndereco(setErros, validacao)} autoFocus>
              Salvar
            </Button>
          </DialogActions>
        </form >
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
