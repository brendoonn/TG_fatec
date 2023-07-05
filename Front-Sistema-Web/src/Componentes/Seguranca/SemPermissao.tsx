import LockRoundedIcon from '@mui/icons-material/LockRounded';
import { Grid } from '@mui/material';
import "../../Estilos/Css/Customizacao.css"

export default function SemPermissao() {
    return (
        <div className="alinhar-centro">
            <Grid container spacing={3} className="alinhar-centro-vertical alinhar-centro centralizar-texto">
                <Grid item xs={12}>
                    <LockRoundedIcon className='icone-seguranca'/>
                </Grid>
                <Grid item xs={12}>
                    <p>Você não tem permissões necessárias para acessar essa página. Por favor, contate um administrador.</p>
                </Grid>
            </Grid>
        </div>
    )
}