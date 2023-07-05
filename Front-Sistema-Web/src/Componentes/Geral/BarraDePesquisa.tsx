import { FormControl, Grid, InputLabel, OutlinedInput, InputAdornment, IconButton, Hidden } from "@mui/material";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { IrPara } from "../../Utils/Tools";
import AddIcon from '@mui/icons-material/Add';
import "../../Estilos/Css/Customizacao.css";
import { propsBarraDePesquisa } from "../../Interfaces/BarraDePesquisa";


export default function BarraDePesquisa({ tituloPagina, designBotao, url, pesquisaSearchBar, abrirModal }: propsBarraDePesquisa) {
    const direcionar = () => {
        IrPara(url);
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <div className="titulo-pagina">
                    <p>{tituloPagina}</p>
                </div>
            </Grid>
            <Hidden mdDown>
                <Grid item xs={7} md={5} lg={7}>
                    <div className="row">
                        <button className={`botao-adicionar ${designBotao}`} onClick={abrirModal === null ? direcionar : abrirModal}><AddIcon />Adicionar</button>
                    </div>
                </Grid>
            </Hidden>
            <Grid item xs={12} lg={5} md={7} sx={{ margin: "auto" }}>
                <FormControl variant="outlined" size="small" fullWidth
                >
                    <InputLabel>Buscar</InputLabel>
                    <OutlinedInput
                        fullWidth
                        onChange={(searchVal) => pesquisaSearchBar(searchVal.target.value)}
                        label="Buscar"
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton >
                                    <SearchOutlinedIcon>
                                    </SearchOutlinedIcon>
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}