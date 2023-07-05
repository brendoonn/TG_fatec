import { BrowserRouter, Route, Routes } from "react-router-dom";
import Clientes from "./Paginas/Clientes";
import Login from "./Paginas/Login";
import Produtos from "./Paginas/Produtos";
import EditarCliente from "./Paginas/EditarCliente";
import Fornecedores from "./Paginas/Fornecedores";
import EditarFornecedor from "./Paginas/EditarFornecedor";
import Editarproduto from "./Paginas/EditarProduto";
import Vendas from "./Paginas/Vendas";
import VisualizarVenda from "./Paginas/VisualizarVenda";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import PersonalizarSistema from "./Paginas/PersonalizarSistema";
import Usuarios from "./Paginas/Usuarios";
import AdicionarUsuario from "./Paginas/AdicionarUsuario";
import EntradaNoEstoque from "./Paginas/EntradaNoEstoque";
import { useAppSelector } from "./Hooks/useAppSelector";
import PrivateRoute from "./Componentes/PrivateRoute";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Tema/theme";
import Marcas from "./Paginas/Marcas";
import Categorias from "./Paginas/Categorias";
import ContainerLogin from "./Componentes/Login/ContainerLogin";
import ContainerGeral from "./Componentes/Geral/ContainerGeral";
import AdicionarProduto from "./Paginas/AdicionarProduto";
import AdicionarVenda from "./Paginas/AdicionarVenda";
import AdicionarEntEstoque from "./Paginas/AdicionarEntEstoque";
import BaixaNoEstoque from "./Paginas/BaixaNoEstoque";
import AdicionarBaixaEstoque from "./Paginas/AdicionarBaixaEstoque";
import Perfil from "./Paginas/Perfil";
import { NiveisDeAcessoDisponivies } from "./Constantes/DireitosDeAcesso";
import Home from "./Paginas/Home";
import VisuazarEntEstoque from "./Paginas/VisualizarEntEstoque";
import EditarUsuario from "./Paginas/EditarUsuario";
import Cargos from "./Paginas/Cargos";

function App() {
  const tema = useMode();
  const autenticacao = useAppSelector((state) => state.autenticar);

  return (

    <ColorModeContext.Provider value={tema.colorMode}>
      <ThemeProvider theme={tema.theme}>
        <CssBaseline />
        <BrowserRouter>

          {autenticacao.logado ? (
            <>
              <ContainerGeral>
                {RotasMain()}
              </ContainerGeral>
            </>
          ) : (
            <>
              <ContainerLogin>
                {RotasMain()}
              </ContainerLogin>
            </>
          )}
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

function RotasMain() {
  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.acessoGeral} tituloPagina="Home">
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/produtos"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.acessoGeral} tituloPagina="Produtos">
              <Produtos />
            </PrivateRoute>
          }
        />
        <Route
          path="/produtos/adicionarproduto"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Adicionar Produto">
              <AdicionarProduto />
            </PrivateRoute>
          }
        />
        <Route
          path="/entradanoestoque"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Entradas no Estoque">
              <EntradaNoEstoque />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/produtos/editarproduto/:id"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Editar Produto">
              <Editarproduto />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoVenda} tituloPagina="Clientes">
              <Clientes></Clientes>
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes/editarcliente/:id"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoVenda} tituloPagina="Editar Cliente">
              <EditarCliente />
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedores"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Fornecedores">
              <Fornecedores />
            </PrivateRoute>
          }
        />
        <Route
          path="/fornecedores/editarfornecedor/:id"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Editar Fornecedor">
              <EditarFornecedor />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendas"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoVenda} tituloPagina="Vendas">
              <Vendas />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendas/adicionarvenda"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoVenda} tituloPagina="Adicionar Venda">
              <AdicionarVenda />
            </PrivateRoute>
          }
        />
        <Route
          path="/vendas/vendaefetuada/:idVenda"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoVenda} tituloPagina="Venda Efetuada">
              <VisualizarVenda />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/personalizarsistema"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes} tituloPagina="Personalizar">
              <PersonalizarSistema />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/usuarios"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes} tituloPagina="Usuários">
              <Usuarios />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/usuarios/adicionarusuario"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes} tituloPagina="Adicionar Usuário">
              <AdicionarUsuario />
            </PrivateRoute>
          }
        ></Route>
          <Route
          path="/usuarios/editarusuario/:id"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes} tituloPagina="Editar Usuário">
              <EditarUsuario />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/entradanoestoque/cadastrarestoque"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Cadastrar no Estoque">
              <AdicionarEntEstoque />
            </PrivateRoute>
          }>
        </Route>
        <Route path="/entradanoestoque/visualizarentrada/:idCompra"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Visualizar Compra">
              <VisuazarEntEstoque />
            </PrivateRoute>
          }>
        </Route>
        <Route path="/marcas"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Marcas">
              <Marcas></Marcas>
            </PrivateRoute>
          }>
        </Route>
        <Route path="/categorias"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Categorias">
              <Categorias></Categorias>
            </PrivateRoute>
          }>
        </Route>
        <Route path="/baixanoestoque"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Baixas no Estoque">
              <BaixaNoEstoque></BaixaNoEstoque>
            </PrivateRoute>
          }>
        </Route>
        <Route path="/baixanoestoque/cadastrarbaixa"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Cadastrar Baixa">
              <AdicionarBaixaEstoque></AdicionarBaixaEstoque>
            </PrivateRoute>
          }>
        </Route>
        <Route path="/perfil"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoEstoque} tituloPagina="Perfil">
              <Perfil></Perfil>
            </PrivateRoute>
          }>
        </Route>
        <Route path="/cargos"
          element={
            <PrivateRoute direitosDeAcesso={NiveisDeAcessoDisponivies.niveisDeAcessoConfiguracoes} tituloPagina="Cargos">
              <Cargos></Cargos>
            </PrivateRoute>
          }>
        </Route>
      </Routes>
    </main>
  );

};
