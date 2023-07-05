import Button from '@mui/material/Button';
import { useStyles } from '../../Estilos/MakeStyles/StylesSite';
import { Box, Dialog, DialogActions, DialogContent, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import ModalHeader from './ModalHeader';
import PageviewIcon from '@mui/icons-material/Pageview';
import "../../Estilos/Css/Customizacao.css";
import "../../Estilos/Css/Vendas.css";
import { propsModalBaixa } from '../../Interfaces/Modais';
export default function ModalVisualizarBaixaEstoque(props: propsModalBaixa) {

    const classes = useStyles();
    const [abrir, setAbrir] = useState(false);
    const abrirModal = (comando: boolean) => {
        setAbrir(comando);
    }

    var baixa = props.baixa;
    
    return (
        <>
            <PageviewIcon className="tamanho-icone" onClick={() => abrirModal(true)} />
            <Dialog
                className={classes.modalEspacamento}
                open={abrir}
                maxWidth="lg"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <ModalHeader titulo={`Baixa #${baixa.id}`} fecharModal={() => abrirModal(false)} />
                <DialogContent>
                    <Box mb={3}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Box className="box-detalhes">
                                    <Box>
                                        <p className="titulo-cards">PRODUTO</p>
                                    </Box>
                                    <Box>
                                        <p className='retirar-margem'>{baixa.nome} - ({baixa.ID_produto})</p>
                                        <p className='retirar-margem'>Quantidade retirada: {baixa.quantidade}x</p>
                                    </Box>
                                </Box>

                            </Grid>
                            <Grid item xs={12}>
                                <Box className="box-detalhes">
                                    <Box>
                                        <p className="titulo-cards">JUSTIFICATIVA</p>
                                    </Box>
                                    <Box>
                                        <p>{baixa.descricao}</p>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}