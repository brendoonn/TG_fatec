import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import { GridActionsCellItem } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import { getData } from "../Routes/getRoutes";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import ModalVisualizarBaixaEstoque from "../Componentes/Modais/ModalVisualizarBaixaEstoque";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";

export default function BaixaNoEstoque() {
    const classeCssEstoque = "pagina-baixa-estoque";
    const colunasTabelaBaiEstoq = [
        //manter o ID pra poder ser identificado como indice da linha
        { field: 'id', headerName: 'código', flex: 5 },
        { field: 'nome', headerName: 'Produto retirado', flex: 20, cellClassName: 'data' },
        { field: 'quantidade', headerName: 'Quantidade', flex: 10, cellClassName: 'valor' },
        { field: 'ID_estoque', headerName: 'Código da compra ', flex: 15, cellClassName: 'fornecedor' },
        { field: 'descricao', headerName: 'Motivo da baixa ', flex: 45, cellClassName: 'fornecedor' },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params: any) => [
                <GridActionsCellItem
                    icon={<ModalVisualizarBaixaEstoque baixa={params.row}/>}
                    label="Editar"
                />,
                <GridActionsCellItem
                    icon={<ModalExcluir tabela={"venda"} id={params.row.id}></ModalExcluir>}
                    label="Excluir"
                />,

            ],
        }
    ]

    const [listaProdutos, setListaProdutos] = useState([]);
    const [linhasTabelaBaixEstoq, setLinhasTabelaBaixEstoq] = useState(listaProdutos);
    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaBaixEstoq, quantidadePorPagina);

    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaProdutos = await getData('baixavenda');
                if (listaProdutos.length > 0) {
                    listaProdutos = listaProdutos.map((item: any) => {
                        return {
                            id: item.ID_venda,
                            descricao: item.descricao,
                            nome: item.nome,
                            ID_estoque: item.ID_estoque,
                            quantidade: item.quantidade,
                            ID_produto: item.ID_produto
                        };
                    });
                    console.log(listaProdutos)
                    setListaProdutos(listaProdutos);
                    setLinhasTabelaBaixEstoq(listaProdutos);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaProdutos, searchedVal);
        setLinhasTabelaBaixEstoq(filtrarArray);

    };

    const urlAdicionarBaixa = "baixanoestoque/cadastrarbaixa";

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div>
            <BarraDePesquisa
                tituloPagina="Baixa no Estoque"
                designBotao={classeCssEstoque}
                url="/baixanoestoque/cadastrarbaixa"
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={null}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaBaiEstoq} linhas={linhasTabelaBaixEstoq} cor={obterValorBackground(classeCssEstoque)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssEstoque}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => IrPara(urlAdicionarBaixa)} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((estoque: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div>
                                    <p><b>ID Baixa: ({estoque.id})</b></p>
                                    <p><b>Produto: </b>{estoque.nome} </p>
                                    <p><b>Quantidade: </b>{estoque.quantidade}</p>
                                </div>
                                <div className="icons-acoes">
                                    <ModalVisualizarBaixaEstoque baixa={estoque}/>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"venda"} id={estoque.id}></ModalExcluir>
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
