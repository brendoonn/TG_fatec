import { Divider, Grid, Hidden, Pagination } from "@mui/material";
import ModalAdicionarCliente from "../Componentes/Modais/ModalAdicionarCliente";
import { useEffect, useState } from "react";
import React from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import "../Estilos/Css/Clientes.css";
import { getData } from "../Routes/getRoutes";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";

export default function Clientes() {
    const [adicionarCliente, setAdicionarCliente] = React.useState(false);
    const abrirModal = () => setAdicionarCliente(true);
    const fecharModal = () => setAdicionarCliente(false);
    const classeCssClientes = "pagina-clientes";
    const colunasTabelaClientes = [
        //manter o ID pra poder ser identificado como indice da linha
        { field: 'cpf', headerName: 'CPF', flex: 25 },
        { field: 'nome', headerName: 'Primeiro nome', flex: 35 },
        { field: 'sobrenome', headerName: 'Ultimo nome', flex: 35 },
        { field: 'email', headerName: 'E-mail', flex: 35 },
        { field: 'celular', headerName: 'Celular', flex: 20 },
        {
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (item: any) => [
                <GridActionsCellItem
                    icon={<EditIcon className="tamanho-icone" />}
                    label="Editar"
                    onClick={() => IrPara(`/clientes/editarcliente/${item.id}`)}
                />,
                <GridActionsCellItem
                    icon={<ModalExcluir tabela={"pessoa"} id={item.id}></ModalExcluir>}
                    label="Excluir"
                />,

            ],
        },

    ]


    const [listaClientes, setListaClientes] = useState([]);
    //quando a página carregar vai executar a função
    useEffect(() => {
        const fecthData = async () => {
            try {
                var listaClientes = await getData('pessoa');
                if (listaClientes.length > 0) {
                    listaClientes = listaClientes.map((item: any) => {
                        return {
                            id:                 item.ID_pessoa,
                            nome:               item.nome,
                            sobrenome:          item.sobrenome,
                            cpf:                item.cpf,
                            data_nascimento:    item.data_nascimento,
                            celular:            item.celular,
                            email:              item.email,
                        };
                    });
                    setListaClientes(listaClientes);
                    setLinhasTabelaClientes(listaClientes);
                }
            } catch (error) { }
        };
        fecthData();
    }, []);


    const [linhasTabelaClientes, setLinhasTabelaClientes] = useState(listaClientes);
    const pesquisarSearchBar = (searchedVal: string) => {
        const filtrarArray = filterByValue(listaClientes, searchedVal);
        setLinhasTabelaClientes(filtrarArray);
    };
    const quantidadePorPagina = 10;
    var listaMobile = UtilizarPaginacao(linhasTabelaClientes, quantidadePorPagina);

    const handleChange = (e: any, p: number) => {
        listaMobile.mudarPagina(p);
    };

    return (
        <div >
            <ModalAdicionarCliente adicionarCliente={adicionarCliente} fecharModal={fecharModal}></ModalAdicionarCliente>
            <BarraDePesquisa
                pesquisaSearchBar={pesquisarSearchBar}
                url={""}
                tituloPagina={"Lista de Clientes"}
                designBotao={classeCssClientes}
                abrirModal={abrirModal}
            ></BarraDePesquisa>
            <Hidden mdDown>
                <TabelaCustomizada colunas={colunasTabelaClientes} linhas={linhasTabelaClientes} cor={obterValorBackground(classeCssClientes)}></TabelaCustomizada>
            </Hidden>
            <Hidden mdUp>
                <div className={`cabecalho-lista-mobile ${classeCssClientes}`}>
                    <div><p>LISTA</p></div>
                    <div className="adicionar-mobile">
                        <AddIcon onClick={() => abrirModal()} />
                    </div>
                </div>
                <Grid container>
                    {listaMobile.registros.map((cliente: any, index: number) => (
                        <Grid item xs={12} key={index}>
                            <div className="card-clientes">
                                <div>
                                    <p><b>{cliente.nome}{" "}{cliente.sobre_nome}</b></p>
                                    <p className="codigo-lista">{cliente.cpf} </p>
                                </div>
                                <div className="icons-acoes">
                                    <EditIcon className="tamanho-icone" onClick={() => IrPara("/clientes/editarcliente")}></EditIcon>
                                    <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                                    <ModalExcluir tabela={"pessoa"} id={cliente.id}></ModalExcluir>
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
