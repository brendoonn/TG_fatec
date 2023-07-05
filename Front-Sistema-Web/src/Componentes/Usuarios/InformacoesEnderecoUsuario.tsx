import { Grid, TextField, Typography } from "@mui/material";
import { buscarCep } from "../../Utils/Validacoes/Validacoes";


export default function InformacoesEnderecoUsuario(props: any) {
    var validacao = props.validacao;
    var erros = props.erros;
    var setErros = props.setErros;

    return (

        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h6"><strong>Informações de Endereço</strong></Typography>
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
                <TextField
                    fullWidth
                    id="campo-cep"
                    label={"CEP"}
                    name={"cep"}
                    inputProps={{ maxLength: 9 }}
                    value={validacao.values.cep}
                    onChange={(e) => buscarCep(e.target.value, validacao, setErros)}
                    error={validacao.touched.cep && Boolean(validacao.errors.cep)}
                    helperText={validacao.touched.cep && validacao.errors.cep}
                />
            </Grid>
            <Grid item xs={12} sm={3} lg={2}>
                <TextField
                    fullWidth
                    id="campo-uf"
                    label={"UF"}
                    name={"uf"}
                    inputProps={{ maxLength: 2 }}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={validacao.values.uf}
                    onChange={validacao.handleChange}
                    error={validacao.touched.uf && Boolean(validacao.errors.uf)}
                    helperText={validacao.touched.uf && validacao.errors.uf}
                />
            </Grid>
            <Grid item xs={12} sm={9} lg={6}>
                <TextField
                    fullWidth
                    id="campo-cidade"
                    label={"Cidade"}
                    name={"cidade"}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={validacao.values.cidade}
                    onChange={validacao.handleChange}
                    error={validacao.touched.cidade && Boolean(validacao.errors.cidade)}
                    helperText={validacao.touched.cidade && validacao.errors.cidade}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <TextField
                    fullWidth
                    id="campo-rua"
                    label={"Rua"}
                    name={"rua"}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={validacao.values.rua}
                    onChange={validacao.handleChange}
                    error={validacao.touched.rua && Boolean(validacao.errors.rua)}
                    helperText={validacao.touched.rua && validacao.errors.rua}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={4}>
                <TextField
                    fullWidth
                    id="campo-bairro"
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
            <Grid item xs={12} sm={12} lg={2}>
                <TextField
                    fullWidth
                    id="campo-numero"
                    label={"Numero"}
                    name={"numero"}
                    value={validacao.values.numero}
                    onChange={validacao.handleChange}
                    error={validacao.touched.numero && Boolean(validacao.errors.numero)}
                    helperText={validacao.touched.numero && validacao.errors.numero}
                />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
                <TextField
                    fullWidth
                    helperText=""
                    id="campo-complemento"
                    label={"Complemento"}
                    name={"referencia"}
                    value={validacao.values.referencia}
                    onChange={validacao.handleChange} />
            </Grid>
        </Grid>

    );
}