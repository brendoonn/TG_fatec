import { Chip, Divider, Grid, Hidden, Pagination } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import { GridActionsCellItem } from "@mui/x-data-grid"
import EditIcon from '@mui/icons-material/Edit';
import { getData } from "../Routes/getRoutes";
import "../Estilos/Css/ListaMobile.css";
import "../Estilos/Css/Customizacao.css";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import {formatarPrecoPadrao, verificaSeTemValor } from "../Utils/Validacoes/Mascaras";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';

export default function Produtos() {
    const classeCssProduto = "pagina-produto";
    const colunasTabelaProdutos = [
        //manter o ID pra poder ser identificado como indice da linha
        { field: 'id', headerName: 'Código', flex: 10 },
        { field: 'nome', headerName: 'Nome', flex: 20, cellClassName: 'nome' },
        { field: 'nome_marca', headerName: 'Marca', flex: 15, cellClassName: 'marca' },
        { field: 'categoria', headerName: 'Categoria ', flex: 15, cellClassName: 'categoria' },
        { field: 'valor', headerName: 'Valor', flex: 15, cellClassName: 'valor' },
        {
            field: 'quantidade_total', headerName: 'Quantidade Total', flex: 15, cellClassName: 'qtd_total',
        },
        {
            field: 'min_recomendado', headerName: 'Status', flex: 15, cellClassName: 'status',
            renderCell: (item: any) => (
                exibeStatus(item.row.min_recomendado)
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (item: any) => [
                <GridActionsCellItem
                    icon={<EditIcon className="tamanho-icone" />}
                    label="Editar"
                    onClick={() => IrPara(`/produtos/editarproduto/${item.id}`)}

                />,
                <GridActionsCellItem
                    icon={<ModalExcluir tabela={"produto"} id={item.id}></ModalExcluir>}
                    label="Excluir"
                />,

            ],
        }
    ]

    // const [listaProdutos, setListaProdutos] = useState([]);
    const [linhasTabela, setLinhasTabela] = useState([]);
    const [produtosPesquisa, setProdutosPesquisa] = useState([]);
    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabela, quantidadePorPagina);

    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaProdutos = await getData('produto');

                if (listaProdutos.length > 0) {
                  
                    listaProdutos = listaProdutos.map((item: any) => {
                        return {
                            id: item.ID_produto,
                            nome: item.nome,
                            valor: formatarPrecoPadrao(item.valor_uni),
                            descricao: item.descricao,
                            ID_marca: item.ID_marca,
                            nome_marca: item.nome_marca,
                            ID_categoria: item.ID_categoria,
                            categoria: item.categoria,
                            desc_categoria: item.desc_categoria,
                            quantidade_total: item.quantidade_total !== null ? item.quantidade_total : 0,
                            min_recomendado: verificarPorcentagem(item.porcentagem_estoque),
        
                        };
                        
                    });
                   
                    // setListaProdutos(listaProdutos);
                    setLinhasTabela(listaProdutos);
                    setProdutosPesquisa(listaProdutos);
                    listaMobile = UtilizarPaginacao(listaProdutos, quantidadePorPagina);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const verificarPorcentagem = (valor: any) => {
        if(verificaSeTemValor(valor)){
            if (valor > 70) {
                return "Estável";
              } else if (valor >= 30) {
                return "Baixo";
              } else {
                return "Alerta";
              }
        }
        return "Alerta";
      }
    const exibeStatus = (status: string) => {
        if(status === "Estável"){
            return <Chip variant="outlined" color="success" icon={<CheckIcon />} label={status} />;
        }else if(status === "Baixo"){
            return <Chip variant="outlined" color="warning" icon={<WarningIcon />} label={status}/>
        }else{
            return <Chip variant="outlined" color="error" icon={<ErrorIcon />} label={status}/>
        }
    }
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(produtosPesquisa, searchedVal);
        setLinhasTabela(filtrarArray);
    };

    const urlAdicionarProduto = "/produtos/adicionarproduto";

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div>
            <BarraDePesquisa
                pesquisaSearchBar={pesquisarSearchBar}
                url={urlAdicionarProduto}
                tituloPagina={"Lista de Produtos"}
                designBotao={classeCssProduto}
                abrirModal={null}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaProdutos} linhas={linhasTabela} cor={obterValorBackground(classeCssProduto)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssProduto}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => IrPara(urlAdicionarProduto)} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((produto: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div>
                                    <p><b>{produto.nome} ({produto.nome_marca})</b></p>
                                    <p className="codigo-lista"><b>Código:</b>{produto.id} </p>
                                    <p>{produto.valor}</p>
                                </div>
                                <div className="icons-acoes">
                                    <EditIcon className="tamanho-icone" onClick={() => IrPara(`/produtos/editarproduto/${produto.id}`)}></EditIcon>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"produto"} id={produto.id}></ModalExcluir>
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

