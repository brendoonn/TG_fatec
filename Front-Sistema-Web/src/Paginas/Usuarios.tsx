import { Avatar, Divider, Grid, Hidden, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import TabelaCustomizada from "../Componentes/Tabela/TabelaCustomizada";
import { GridActionsCellItem } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BarraDePesquisa from "../Componentes/Geral/BarraDePesquisa";
import { filterByValue, IrPara, obterValorBackground } from "../Utils/Tools";
import UtilizarPaginacao from "../Hooks/usePaginacao";
import AddIcon from '@mui/icons-material/Add';
import { getData } from "../Routes/getRoutes";
import "../Estilos/Css/ListaMobile.css";
import ModalExcluir from "../Componentes/Modais/ModalExcluir";

export default function Usuarios() {

  const classeCssUsuarios = "pagina-usuarios";
  const colunasTabelaFuncionarios: any[] = [
    //manter o ID pra poder ser identificado como indice da linha
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 5,
      renderCell: (params: any) => {
        return (
          <>
            <Avatar>{params.row.nome.charAt(0)}</Avatar>
          </>
        );
      }
    },
    { field: 'id', headerName: 'ID', flex: 10 },
    { field: 'nome', headerName: 'Nome', flex: 35 },
    { field: 'nivel_acesso', headerName: 'Nivel de acesso', flex: 15 },
    {
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: any) => [
        <GridActionsCellItem
          icon={<EditIcon className="tamanho-icone" onClick={() => IrPara(`/usuarios/editarusuario/${params.id}`)} />}
          label="Editar"
        />,
        <GridActionsCellItem
          icon={<ModalExcluir tabela={"funcionario"} id={params.id}></ModalExcluir>}
          label="Excluir"
        />,

      ],
    }
  ];


  //const lista = [{ id: 1, nome: 'Monalisa Sousa', nivelAcesso: 'ADM' }, { id: 2, nome: 'Monalisa Sousa', nivelAcesso: 'hd' }]
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const quantidadePorPagina = 10;
  var listaMobile = UtilizarPaginacao(listaUsuarios, quantidadePorPagina);
  const [linhasTabelaFuncionarios, setLinhasTabelaFuncionarios] = useState(listaUsuarios);

  //quando a página carregar vai executar a função
  useEffect(() => {
    const fecthData = async () => {
      try {
        var listaUsuarios = await getData('funcionario');
        if (listaUsuarios.length > 0) {
          listaUsuarios = listaUsuarios.map((item: any) => {
            return {
              id: item.ID_funcionario,
              fk_pessoa: item.FK_pessoa,
              cargo: item.FK_cargo,
              data_adminissao: item.data_adminissao,
              nivel_acesso: item.nivel_acesso,
              nome: item.nome + " " + item.sobrenome

            };
          });
          setListaUsuarios(listaUsuarios);
          setLinhasTabelaFuncionarios(listaUsuarios);
          listaMobile = UtilizarPaginacao(listaUsuarios, quantidadePorPagina);

        }
      } catch (error) { }
    };
    fecthData();
  }, []);


  const pesquisarSearchBar = (searchedVal: string) => {
    const filtrarArray = filterByValue(listaUsuarios, searchedVal);
    setLinhasTabelaFuncionarios(filtrarArray);
  };

  const handleChange = (e: any, p: number) => {
    listaMobile.mudarPagina(p);
  };

  const urlAdicionarUsuarios = "/usuarios/adicionarusuario";
  return (
    <div>
      <BarraDePesquisa
        tituloPagina={"Lista de Usuários"}
        designBotao={classeCssUsuarios}
        url={urlAdicionarUsuarios}
        pesquisaSearchBar={pesquisarSearchBar}
        abrirModal={null}
      ></BarraDePesquisa>
      <Hidden mdDown>
        <TabelaCustomizada colunas={colunasTabelaFuncionarios} linhas={linhasTabelaFuncionarios} cor={obterValorBackground(classeCssUsuarios)}></TabelaCustomizada>
      </Hidden>
      <Hidden mdUp>
        <div className={`cabecalho-lista-mobile ${classeCssUsuarios}`}>
          <div><p>LISTA</p></div>
          <div className="adicionar-mobile">
            <AddIcon onClick={() => IrPara(urlAdicionarUsuarios)} />
          </div>
        </div>
        {listaMobile.registros.map((usuario: any, index: number) => (
          <Grid container key={index} className="card-lista">
            <Grid item xs={2}>
              <div className="usuario-icon">
                <Avatar>{usuario.nome.charAt(0)}</Avatar>
              </div>
            </Grid>
            <Grid item xs={7}>
              <p><b>{usuario.nome}</b></p>
              <p className="codigo-lista"><b>Nivel Acesso:</b>{usuario.nivel_acesso}</p>
            </Grid>
            <Grid item xs={3}>
              <div className="icons-acoes icons-acoes-usuario">
                <EditIcon className="tamanho-icone" onClick={() => IrPara(`/usuarios/editarusuario/${usuario.id}`)}></EditIcon>
                <Divider orientation="vertical" style={{ height: "33px", width: "5px" }} />
                <ModalExcluir tabela={"funcionario"} id={usuario.id}></ModalExcluir>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid >))
        }
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
      </Hidden >
    </div >
  )
}
