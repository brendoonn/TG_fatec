import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { filterByValue, obterValorBackground } from "../Utils/Tools";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import "../Estilos/Css/ListaMobile.css";
import "../Estilos/Css/Customizacao.css";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";
import ModalCategoria from "../Componentes/Modais/ModalCategoria";
import { getData } from "../Routes/getRoutes";
import { categoriaPost } from "../Interfaces/Produto";
import ModalEditarCategoria from "../Componentes/Modais/ModalEditarCategoria";

const classeCssCategorias = "pagina-fornecedores";
const colunasTabelaCategorias = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id', headerName: 'ID', flex: 10 },
    { field: 'categoria', headerName: 'Categoria', flex: 15 },
    { field: 'desc_categoria', headerName: 'Descrição', flex: 15 },
    {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
            <GridActionsCellItem
                icon={<ModalEditarCategoria categoria={params.row} />}
                label="Editar"
            />,
            <GridActionsCellItem
                icon={<ModalExcluir tabela={"categoria"} id={params.row.id} qtd={0}></ModalExcluir>}
                label="Excluir"
            />,

        ],
    }
]


export default function Categorias() {


    const [listaCategorias, setListaCategorias] = useState(new Array<categoriaPost>());
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaCategorias = await getData('categoria');
                if (listaCategorias.length > 0) {
                    listaCategorias = listaCategorias.map((item: any) => {
                        return {
                            id: item.ID_categoria,
                            categoria: item.categoria,
                            desc_categoria: item.desc_categoria
                        };
                    });
                    setListaCategorias(listaCategorias);
                    setLinhasTabelaCategorias(listaCategorias);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const [adicionarCategoria, setAdicionarCategoria] = useState(false);
    const abrirModal = () => setAdicionarCategoria(true);
    const fecharModal = () => setAdicionarCategoria(false);

    const [linhasTabelaCategorias, setLinhasTabelaCategorias] = useState(listaCategorias);
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaCategorias, searchedVal);
        setLinhasTabelaCategorias(filtrarArray);
    };

    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaCategorias, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <ModalCategoria abrir={adicionarCategoria} fecharModal={fecharModal}></ModalCategoria>
            <BarraDePesquisa
                tituloPagina="Categorias cadastradas"
                designBotao={classeCssCategorias}
                url=""
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={abrirModal}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaCategorias} linhas={linhasTabelaCategorias} cor={obterValorBackground(classeCssCategorias)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssCategorias}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => abrirModal()} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((categoria: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div className="informacoes-card">
                                    <p><b>{categoria.categoria}</b></p>
                                    <p className="codigo-lista">{categoria.desc_categoria}</p>
                                </div>
                                <div className="icons-acoes">
                                    <ModalEditarCategoria categoria={categoria}></ModalEditarCategoria>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"categoria"} id={categoria.id} qtd={0}></ModalExcluir>
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

