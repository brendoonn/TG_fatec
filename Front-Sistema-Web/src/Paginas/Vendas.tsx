import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import { useEffect, useState } from "react";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import "../Estilos/Css/Vendas.css";
import PageviewIcon from '@mui/icons-material/Pageview';
import { getData } from "../Routes/getRoutes";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";
import { formatarDataParaEstiloBrasileiro, formatarPrecoPadrao } from "../Utils/Validacoes/Mascaras";

// const irPara = (id: any) => {
//     window.location.replace(`/vendas/vendaefetuada`);
//     console.log("")
// };

const classeCssVendas = "pagina-vendas";
const colunasTabelaVendas = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id', headerName: 'ID', width: 35 },
    { field: 'funcionario_nome', headerName: 'Funcionario', flex: 35    , cellClassName: 'marca' },
    //{ field: 'cliente_nome', headerName: 'Cliente', flex: 35, cellClassName: 'nome' },
    { field: 'total_produtos_vendidos', headerName: 'Quantidade de Itens ', flex: 15, cellClassName: 'categoria' },
    { field: 'valor_total', headerName: 'Valor total ', flex: 15, cellClassName: 'categoria' },
    { field: 'data_venda', headerName: 'Data da venda', flex: 15, cellClassName: 'data_validade_lote' },
    {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (item: any) => [
            <GridActionsCellItem
                icon={<PageviewIcon className="tamanho-icone" />}
                label="Visualizar Venda"
                onClick={() => IrPara(`/vendas/vendaefetuada/${item.id}`)}
            />,
            <GridActionsCellItem
                icon={<ModalExcluir tabela={"venda"} id={item.id}></ModalExcluir>}
                label="Excluir"
            />,

        ],
    }
]

export default function Vendas() {



    const [listaVendas, setListaVendas] = useState([]);
    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaVendas = await getData('venda');
                if (listaVendas.length > 0) {
                    listaVendas = listaVendas.map((item: any) => {
                        return {
                            id: item.ID_venda,
                            data_venda: formatarDataParaEstiloBrasileiro(item.data_venda),
                            cliente_nome: item.cliente_nome  + " " + item.sobrenome,
                            funcionario_nome: item.funcionario_nome + " " + item.funcionario_sobrenome,
                            total_produtos_vendidos: item.total_produtos_vendidos,
                            valor_total: formatarPrecoPadrao(item.valor_total),

                        };
                    });
                    setListaVendas(listaVendas);
                    setLinhasTabelaVendas(listaVendas);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const [linhasTabelaVendas, setLinhasTabelaVendas] = useState(listaVendas);
    const urlAdicionarVenda = "/vendas/adicionarvenda";
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaVendas, searchedVal);
        setLinhasTabelaVendas(filtrarArray);

    };

    const quantidadePorPagina = 2;
    var listaMobile = UtilizarPaginacao(linhasTabelaVendas, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <BarraDePesquisa
                tituloPagina={"Vendas Efetuadas"}
                designBotao={classeCssVendas}
                url={urlAdicionarVenda}
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={null}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaVendas} linhas={linhasTabelaVendas} cor={obterValorBackground(classeCssVendas)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssVendas}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => IrPara(urlAdicionarVenda)} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((venda: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div>
                                    <p><b>Cliente:</b> {venda.cliente_nome}</p>
                                    <p className="codigo-lista">{venda.data_venda} </p>
                                    <p><b>Valor Total:</b> {venda.valor_total}</p>
                                    <p><b>Funcionário:</b> {venda.funcionario_nome}</p>
                                </div>
                                <div className="icons-acoes">
                                    <PageviewIcon className="tamanho-icone" onClick={() => IrPara(`/vendas/vendaefetuada/${venda.id}`)}></PageviewIcon>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"venda"} id={venda.id}></ModalExcluir>
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
