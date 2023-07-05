import { FormControl, Grid, TextField, Autocomplete, Typography } from "@mui/material";
import { formatarCpf, mascaraData, mascaraTelefone } from "../../Utils/Validacoes/Mascaras";
import { propsPrimeiraEtapaUsuario } from "../../Interfaces/Usuario";

export default function FormularioAdicionarUsuario(props: propsPrimeiraEtapaUsuario) {
    var validacao = props.validacao;
    var listaCargos = props.listaCargos;

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h6"><strong>Dados Pessoais</strong></Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField
                    fullWidth
                    id="campo-nome"
                    label={"Nome"}
                    name={"nome"}
                    value={validacao.values.nome}
                    onChange={validacao.handleChange}
                    error={validacao.touched.nome && Boolean(validacao.errors.nome)}
                    helperText={validacao.touched.nome && validacao.errors.nome}
                />
            </Grid>
            <Grid item xs={12} lg={8}>
                <TextField
                    fullWidth
                    id="campo-sobrenome"
                    label={"Sobrenome"}
                    name={"sobrenome"}
                    value={validacao.values.sobrenome}
                    onChange={validacao.handleChange}
                    error={validacao.touched.sobrenome && Boolean(validacao.errors.sobrenome)}
                    helperText={validacao.touched.sobrenome && validacao.errors.sobrenome}
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <TextField
                    fullWidth
                    id="campo-cpf"
                    label={"CPF"}
                    name={"cpf"}
                    inputProps={{ maxLength: 14 }}
                    value={formatarCpf(validacao.values.cpf)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.cpf && Boolean(validacao.errors.cpf)}
                    helperText={validacao.touched.cpf && validacao.errors.cpf}
                />
            </Grid>
            
            <Grid item xs={12} lg={8}>
                <TextField
                    fullWidth
                    id="campo-email"
                    label={"E-mail"}
                    name={"email"}
                    type="email"
                    value={validacao.values.email}
                    onChange={validacao.handleChange}
                    error={validacao.touched.email && Boolean(validacao.errors.email)}
                    helperText={validacao.touched.email && validacao.errors.email}
                />
            </Grid>
            
            <Grid item xs={12} md={6} lg={6}>
                <TextField
                    fullWidth
                    id="campo-nascimento"
                    label={"Data de Nascimento"}
                    name={"data_nascimento"}
                    inputProps={{ maxLength: 10 }}
                    value={mascaraData(validacao.values.data_nascimento)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.data_nascimento && Boolean(validacao.errors.data_nascimento)}
                    helperText={validacao.touched.data_nascimento && validacao.errors.data_nascimento}
                />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
                <TextField
                    fullWidth
                    id="campo-celular"
                    label={"Celular"}
                    name={"celular"}
                    value={mascaraTelefone(validacao.values.celular)}
                    onChange={validacao.handleChange}
                    error={validacao.touched.celular && Boolean(validacao.errors.celular)}
                    helperText={validacao.touched.celular && validacao.errors.celular}
                />
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <Autocomplete
                        id="FK_cargo"
                        options={listaCargos}
                        onChange={(event: any, novaOpcao: any) => {
                            if (novaOpcao != null && novaOpcao !== undefined) {
                                validacao.setFieldValue("FK_cargo", novaOpcao?.ID_cargo);
                                props.setOpcaoCargo(novaOpcao);
                            } else {
                                validacao.setFieldValue("FK_cargo", 0);
                            }
                        }}
                        inputValue={props.opcaoCargo.cargo}
                        value={props.opcaoCargo}
                        getOptionLabel={(option) => option.cargo}
                        isOptionEqualToValue={(option: any, value: any) => option.ID_cargo === value.ID_cargo}
                        renderInput={(params) =>
                            <TextField
                                {...params}
                                label="Cargo"
                                error={validacao.touched.FK_cargo && Boolean(validacao.errors.FK_cargo)}
                                helperText={validacao.touched.FK_cargo && validacao.errors.FK_cargo}
                                
                            />}
                    />
                </FormControl>
            </Grid>
        </Grid >

    )
}