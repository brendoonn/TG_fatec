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
import { getData } from "../Routes/getRoutes";
import ModalMarca from "../Componentes/Modais/ModalMarca";
import { marcaPost } from "../Interfaces/Produto";
import ModalEditarMarca from "../Componentes/Modais/ModalEditarMarca";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";

const classeCssMarcas = "pagina-fornecedores";
const colunasTabelaMarcas = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id', headerName: 'ID', flex: 10 },
    { field: 'nome_marca', headerName: 'Marca', flex: 15 },
    { field: 'nacionalidade', headerName: 'Nacionalidade', flex: 15 },
    {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
            <GridActionsCellItem
                icon={<ModalEditarMarca marca={params.row} />}
                label="Editar"
            />,
            <GridActionsCellItem
                icon={<ModalExcluir tabela={"marca"} id={params.row.id}></ModalExcluir>}
                label="Excluir"
            />,

        ],
    }
]



export default function Marcas() {


    const [listaMarcas, setListaMarcas] = useState(new Array<marcaPost>());
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaMarcas = await getData('marca');
                if (listaMarcas.length > 0) {
                    listaMarcas = listaMarcas.map((item: any) => {
                        return {
                            id: item.ID_marca,
                            nome_marca: item.nome_marca,
                            nacionalidade: item.nacionalidade
                        };
                    });
                    setListaMarcas(listaMarcas);
                    setLinhasTabelaMarcas(listaMarcas);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const [adicionarMarca, setAdicionarMarca] = useState(false);
    const abrirModal = () => setAdicionarMarca(true);
    const fecharModal = () => setAdicionarMarca(false);
    const [linhasTabelaMarcas, setLinhasTabelaMarcas] = useState(listaMarcas);
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaMarcas, searchedVal);
        setLinhasTabelaMarcas(filtrarArray);
    };

    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaMarcas, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <ModalMarca abrir={adicionarMarca} fecharModal={fecharModal}></ModalMarca>
            <BarraDePesquisa
                tituloPagina="Marcas cadastradas"
                designBotao={classeCssMarcas}
                url=""
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={abrirModal}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaMarcas} linhas={linhasTabelaMarcas} cor={obterValorBackground(classeCssMarcas)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssMarcas}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => abrirModal()} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((marcas: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div className="informacoes-card">
                                    <p><b>{marcas.nome_marca}</b></p>
                                </div>
                                <div className="icons-acoes">
                                    <ModalEditarMarca marca={marcas} />
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"marca"} id={marcas.id}></ModalExcluir>
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

