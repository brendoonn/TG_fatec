import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import { GridActionsCellItem } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getData } from "../Routes/getRoutes";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import "../Estilos/Css/Customizacao.css";
import AddIcon from '@mui/icons-material/Add';
import UtilizarPaginacao from "../Hooks/usePaginacao";
import { formatarDataParaEstiloBrasileiro, formatarPrecoPadrao } from "../Utils/Validacoes/Mascaras";
import PageviewIcon from '@mui/icons-material/Pageview';

export default function EntradaNoEstoque() {
    const urlAdicionarEntrada = "/entradanoestoque/cadastrarestoque";

    const classeCssEstoque = "pagina-entrada-estoque";
    const colunasTabelaEntEstoq = [
        //manter o ID pra poder ser identificado como indice da linha
        { field: 'id', headerName: 'Código', flex: 10 },
        { field: 'fornecedor', headerName: 'Fornecedor ', flex: 35, cellClassName: 'fornecedor' },
        { field: 'valor_compra', headerName: 'Valor da compra', flex: 15, cellClassName: 'valor' },
        { field: 'data_compra', headerName: 'Data da compra', flex: 15, cellClassName: 'data' },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (item: any) => [
                <GridActionsCellItem
                    icon={<PageviewIcon className="tamanho-icone" />}
                    label="Visualizar Venda"
                    onClick={() => IrPara(`/entradanoestoque/visualizarentrada/${item.id}`)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon className="tamanho-icone" />}
                    label="Excluir"
                />,

            ],
        }
    ]

    const [listaEntradaEstoque, setEntradaEstoque] = useState([]);
    const [linhasTabelaEntEstoque, setLinhasTabelaEntEstoque] = useState(listaEntradaEstoque);
    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaEntEstoque, quantidadePorPagina);

    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaEntradaEstoque = await getData('compraproduto');
                if (listaEntradaEstoque.length > 0) {
                    listaEntradaEstoque = listaEntradaEstoque.map((item: any) => {
                        return {
                            id: item.ID_compra,
                            data_compra:  formatarDataParaEstiloBrasileiro(item.data_compra),
                            valor_compra: formatarPrecoPadrao(item.valor_compra),
                            fornecedor: item.razao_social
                        };
                    });
                    setEntradaEstoque(listaEntradaEstoque);
                    setLinhasTabelaEntEstoque(listaEntradaEstoque);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaEntradaEstoque, searchedVal);
        setLinhasTabelaEntEstoque(filtrarArray);

    };


    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div>
            <BarraDePesquisa
                tituloPagina="Entradas no Estoque"
                designBotao={classeCssEstoque}
                url={urlAdicionarEntrada}
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={null}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaEntEstoq} linhas={linhasTabelaEntEstoque} cor={obterValorBackground(classeCssEstoque)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssEstoque}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => IrPara(urlAdicionarEntrada)} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((estoque: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div>
                                    <p><b>ID Compra: ({estoque.id})</b></p>
                                    <p> {estoque.fornecedor} </p>
                                    <p>{estoque.data_compra}</p>
                                    <p>{estoque.valor_compra}</p>
                                </div>
                                <div className="icons-acoes">
                                    <PageviewIcon className="tamanho-icone" onClick={() => IrPara(`/entradanoestoque/visualizarentrada/${estoque.id}`)} />
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <DeleteIcon className="tamanho-icone"></DeleteIcon>
                                </div>
                            </div>
                            <Divider />
                        </Grid>))}
                </Grid>
                <Grid item xs={12}>
                    <div className="paginacao">
                        <Pagination
                            count={listaMobile.count}
                            size="large"
                            page={listaMobile.pagina}
                            onChange={handleChange}
                        />
                    </div>
                </Grid>
            </Hidden>
        </div>
    )
}
