import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import { Dialog, IconButton } from '@mui/material';
import "../../Estilos/Css/Customizacao.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DoDisturbOutlinedIcon from '@mui/icons-material/DoDisturbOutlined';
import { propsModalConfirmacao } from '../../Interfaces/Modais';

export default function ModalEnvioConfirmado(props: propsModalConfirmacao) {
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
                <div className='header-modal-confirmacao'>
                    <IconButton aria-label="close" onClick={() => props.fecharModal(props.confirmacao)} >
                        <CloseIcon style={{ fontSize: 25 }} />
                    </IconButton>
                </div>
                <div className='modal-confirmacao'>
                    <h4 className='retirar-margem'>{props.mensagem}</h4>
                    <div className='alinhar-centro'>
                        {props.confirmacao ? (<CheckCircleOutlineOutlinedIcon className='check-sucesso'></CheckCircleOutlineOutlinedIcon>):
                        (<DoDisturbOutlinedIcon className='check-erro'></DoDisturbOutlinedIcon>)}
                        
                    </div>
                </div>
            </Dialog >
        </div >
    );
}