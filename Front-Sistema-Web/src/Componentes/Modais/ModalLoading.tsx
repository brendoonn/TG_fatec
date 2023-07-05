import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import { CircularProgress, Dialog } from '@mui/material';
import "../../Estilos/Css/Customizacao.css";
import { propsModalLoading } from '../../Interfaces/Modais';

export default function ModalLoading(props: propsModalLoading) {
    const classes = useStyles();

    return (
        <div>
            <Dialog
                open={props.abrir}
                className={classes.modalEspacamento}
                maxWidth="xl"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className='div-loading'>
                    <div className='alinhar-centro'>
                        <CircularProgress />
                    </div>
                    <h5>Processando...</h5>
                </div>
            </Dialog >
        </div >
    );
}