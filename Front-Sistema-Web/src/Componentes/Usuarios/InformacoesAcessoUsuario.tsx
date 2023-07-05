import { Autocomplete, FormControl, Grid, TextField, Typography } from "@mui/material";
import { listaNivelAcesso } from "../../Constantes/DireitosDeAcesso";

export default function InformacoesAcessoUsuario(props: any) {
    var validacao = props.validacao;
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h6"><strong>Informações de acesso</strong></Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    id="campo-login"
                    label={"Login"}
                    name={"login"}
                    value={validacao.values.login}
                    onChange={validacao.handleChange}
                    error={validacao.touched.login && Boolean(validacao.errors.login)}
                    helperText={validacao.touched.login && validacao.errors.login}
                >
                </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
                <TextField
                    fullWidth
                    id="campo-senha"
                    label={"Senha"}
                    name={"senha"}
                    type="password"
                    value={validacao.values.senha}
                    onChange={validacao.handleChange}
                    error={validacao.touched.senha && Boolean(validacao.errors.senha)}
                    helperText={validacao.touched.senha && validacao.errors.senha}
                />
            </Grid>
            <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                    <Autocomplete
                        id="nivelDeAcesso"
                        options={listaNivelAcesso} // lista de níveis de acesso
                        onChange={(event: any, novaOpcao: any) => {
                            if (novaOpcao != null) {
                                validacao.setFieldValue("nivelDeAcesso", novaOpcao);
                            }
                        }}
                        inputValue={validacao.values.nivelDeAcesso}
                        value={validacao.values.nivelDeAcesso}
                        getOptionLabel={(option) => option} // o rótulo é o próprio valor do nível de acesso
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nível de Acesso"
                                error={validacao.touched.nivelDeAcesso && Boolean(validacao.errors.nivelDeAcesso)}
                                helperText={validacao.touched.nivelDeAcesso && validacao.errors.nivelDeAcesso}
                            />
                        )}
                    />
                </FormControl>
            </Grid>
        </Grid>
    )
}