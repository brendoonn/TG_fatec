import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import ModalAdicionarFornecedor from "../Componentes/Modais/ModalAdicionarFornecedor";
import { useEffect, useState } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import "../Estilos/Css/ListaMobile.css";
import "../Estilos/Css/Customizacao.css";
import { getData } from "../Routes/getRoutes";
import { formatarCnpj } from "../Utils/Validacoes/Mascaras";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";

const classeCssFornecedores = "pagina-fornecedores";
const urlEditarFornecedor = '/fornecedores/editarfornecedor';
const colunasTabelaFornecedores = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id', headerName: 'ID', flex: 10 },
    { field: 'cnpj', headerName: 'CNPJ', flex: 15 },
    { field: 'razao_social', headerName: 'Razão Social', flex: 25 },
    { field: 'email', headerName: 'E-mail', flex: 25 },
    { field: 'telefone', headerName: 'Telefone', flex: 15 },
    {
        field: 'actions',
        type: 'actions',
        width: 80,
        getActions: (item: any) => [
            <GridActionsCellItem
                icon={<EditIcon className="tamanho-icone" />}
                label="Editar"
                onClick={() => IrPara(`/fornecedores/editarfornecedor/${item.id}`)}
            />,
            <GridActionsCellItem
                icon={<ModalExcluir tabela={"fornecedor"} id={item.id}></ModalExcluir>}
                label="Excluir"
            />,

        ],
    }
]


export default function Fornecedores() {


    const [listaFornecedores, setListaFornecedores] = useState([]);
    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaFornecedores = await getData('fornecedor');
                if (listaFornecedores.length > 0) {
                    listaFornecedores = listaFornecedores.map((item: any) => {
                        return {
                            id: item.ID_fornecedor,
                            cnpj: formatarCnpj(item.cnpj),
                            razao_social: item.razao_social,
                            email: item.email,
                            telefone: item.telefone,
                        };
                    });
                    setListaFornecedores(listaFornecedores);
                    setLinhasTabelaFornecedores(listaFornecedores);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);

    const [adicionarFornecedor, setAdicionarFornecedor] = useState(false);
    const abrirModal = () => setAdicionarFornecedor(true);
    const fecharModal = () => setAdicionarFornecedor(false);
    const [linhasTabelaFornecedores, setLinhasTabelaFornecedores] = useState(listaFornecedores);
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaFornecedores, searchedVal);
        setLinhasTabelaFornecedores(filtrarArray);
    };

    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaFornecedores, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <ModalAdicionarFornecedor adicionarFornecedor={adicionarFornecedor} fecharModal={fecharModal}></ModalAdicionarFornecedor>
            <BarraDePesquisa
                tituloPagina="Lista de Fornecedores"
                designBotao={classeCssFornecedores}
                url=""
                pesquisaSearchBar={pesquisarSearchBar}
                abrirModal={abrirModal}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaFornecedores} linhas={linhasTabelaFornecedores} cor={obterValorBackground(classeCssFornecedores)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssFornecedores}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => abrirModal()} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((fornecedor: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-lista">
                                <div className="informacoes-card">
                                    <p><b>{fornecedor.razaoSocial}</b></p>
                                    <p className="codigo-lista">{fornecedor.cnpj}</p>
                                    <p>{fornecedor.email}</p>
                                    <p>{fornecedor.telefone}</p>
                                </div>
                                <div className="icons-acoes">
                                    <EditIcon className="tamanho-icone" onClick={() => IrPara(urlEditarFornecedor)}></EditIcon>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"fornecedor"} id={fornecedor.id}></ModalExcluir>
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

