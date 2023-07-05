import { Grid, Box, Paper, Button } from "@mui/material";
import "../../Estilos/Css/Customizacao.css";
import "../../Estilos/Css/Vendas.css";
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Empresa, InformacoesNotaFiscal } from "../../Models/ModelVenda";
import { imprimirNotaFiscal } from "../../Utils/ImprimirNotaFiscal";
import NotaFiscal from "../NotaFiscal";
import { IrPara } from "../../Utils/Tools";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import { formatarPrecoRealSimbolo } from "../../Utils/Validacoes/Mascaras";
import { Endereco } from "../../Models/ModelEndereco";
import { useEffect, useState } from "react";
import { getData } from "../../Routes/getRoutes";

export default function TerceiraEtapaVendas(props: InformacoesNotaFiscal) {
    var notaFiscal = props;
    const [empresa, setEmpresa] = useState(new Empresa());

    const emitirNotaFiscal = () => {
        imprimirNotaFiscal("notaFiscal", "Nota Fiscal");
    }

    useEffect(() => {
        const fecthData = async () => {
            try {
                var dadosEmpresa = await getData('empresa');

                setEmpresa({
                    bairro: dadosEmpresa[0].emp_bairro,
                    cep: dadosEmpresa[0].emp_cep,
                    cidade: dadosEmpresa[0].emp_municipio,
                    cnpj: dadosEmpresa[0].emp_cnpj,
                    complemento: dadosEmpresa[0].emp_complemento,
                    nome_fantasia: dadosEmpresa[0].emp_nome_fantasia,
                    numero: dadosEmpresa[0].emp_numero,
                    rua: dadosEmpresa[0].emp_logradouro,
                    uf: dadosEmpresa[0].emp_uf
                });

            } catch (error) { }
        };
        fecthData();
    }, []);
    
    return (
        <>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12} lg={8}>
                    <Paper elevation={1}>
                        <Box p={3}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <div className='alinhar-centro'>
                                        <CheckCircleOutlineOutlinedIcon className="check-sucesso-venda"></CheckCircleOutlineOutlinedIcon>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <h4 className="centralizar-texto">Troco: {formatarPrecoRealSimbolo(notaFiscal.troco)}</h4>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='alinhar-centro'>
                                        <Button
                                            color="primary"
                                            size="large"
                                            onClick={() => emitirNotaFiscal()}
                                            startIcon={<PrintIcon />}
                                        >
                                            EMITIR CUPOM FISCAL
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='alinhar-centro'>
                                        <Button
                                            color="primary"
                                            size="large"
                                            onClick={() => IrPara("/vendas/adicionarvenda")}
                                            startIcon={<ShoppingCartIcon />}
                                        >
                                            NOVA VENDA
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className='alinhar-centro'>
                                        <Button
                                            color="primary"
                                            size="large"
                                            onClick={() => IrPara("/vendas")}
                                            startIcon={<UndoRoundedIcon />}
                                        >
                                            VOLTAR AO INÍCIO
                                        </Button>
                                    </div>
                                </Grid>
                                <NotaFiscal empresa={empresa} produtos={notaFiscal.produtos} valorRecebido={notaFiscal.valorRecebido} troco={notaFiscal.troco} totalFinal={notaFiscal.totalFinal}></NotaFiscal>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
};

