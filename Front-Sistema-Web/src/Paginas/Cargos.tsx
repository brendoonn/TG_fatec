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
// import ModalCargo from "../Componentes/Modais/ModalCargo";
// import { cargoPost } from "../Interfaces/Produto";
// import ModalEditarCargo from "../Componentes/Modais/ModalEditarCargo";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";
import { Cargo } from "../Models/ModelUsuario";
import ModalCargo from "../Componentes/Modais/ModalCargo";
import ModalEditarCargo from "../Componentes/Modais/ModalEditarCargo";

const classeCssCargos = "pagina-fornecedores";
const colunasTabelaCargos = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id', headerName: 'ID', flex: 40 },
    { field: 'cargo', headerName: 'Cargo', flex: 40 },
    {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (params: any) => [
            <GridActionsCellItem
                icon={<ModalEditarCargo cargo={params.row} />}
                label="Editar"
            />,
            <GridActionsCellItem
                icon={<ModalExcluir tabela={"cargo"} id={params.row.id}></ModalExcluir>}
                label="Excluir"
            />,

        ],
    }
]



export default function Cargos() {


    const [listaCargos, setListaCargos] = useState(new Array<Cargo>());
    useEffect(() => {
        const fecthData = async () => {
            try {
                var getCargos = await getData('cargo');
                if (getCargos.length > 0) {
                    getCargos = getCargos.map((item: any) => {
                        return {
                            id: item.ID_cargo,
                            cargo: item.cargo
                        };
                    });
                    setListaCargos(getCargos);
                    setLinhasTabelaCargos(getCargos);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const [adicionarCargo, setAdicionarCargo] = useState(false);
    const abrirModal = () => setAdicionarCargo(true);
    const fecharModal = () => setAdicionarCargo(false);
    const [linhasTabelaCargos, setLinhasTabelaCargos] = useState(listaCargos);
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaCargos, searchedVal);
        setLinhasTabelaCargos(filtrarArray);
    };

    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaCargos, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <ModalCargo abrir={adicionarCargo} fecharModal={fecharModal}></ModalCargo>
            <BarraDePesquisa
                tituloPagina="Cargos cadastrados"
                designBotao={classeCssCargos}
                url=""
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={abrirModal}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaCargos} linhas={linhasTabelaCargos} cor={obterValorBackground(classeCssCargos)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssCargos}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => abrirModal()} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((cargos: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div className="informacoes-card">
                                    <p><b>{cargos.cargo}</b></p>
                                </div>
                                <div className="icons-acoes">
                                    <ModalEditarCargo cargo={cargos} />
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"cargo"} id={cargos.id}></ModalExcluir>
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

