import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import "../../Estilos/Css/Customizacao.css";
import { excluirData } from '../../Routes/putRoutes';
import { useNavigate } from 'react-router-dom';

export default function ModalExcluir(tabela: any, id: any) {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const abrir = () => {
        setOpen(true);
    };

    const fechar = () => {
        setOpen(false);
    };

    const excluir = () => {
        excluirData(tabela, id);
        fechar();
        navigate(0);
    }

    return (
        <>
            <DeleteIcon onClick={abrir} className="tamanho-icone"/>
            <Dialog
                open={open}
                aria-labelledby="excluir"
            >
                <DialogTitle id="excluir">
                    {"Excluir"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja excluir este item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={fechar}>
                        Não
                    </Button>
                    <Button onClick={excluir} autoFocus>
                        Sim
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
