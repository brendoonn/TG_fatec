import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../Hooks/useAppSelector';
import SemPermissao from './Seguranca/SemPermissao';
import { verificaPermissoes } from '../Utils/Tools';
import { useEffect } from 'react';

function PrivateRoute({ children, direitosDeAcesso, tituloPagina }: { children: JSX.Element, direitosDeAcesso: string[], tituloPagina: string }) {
  const autenticacao = useAppSelector((state) => state.autenticar);

  useEffect(() => {
    document.title = tituloPagina;
  }, [tituloPagina]);


  if (!autenticacao.logado) {
    return <Navigate to="/login" />;
  } else if (!verificaPermissoes(direitosDeAcesso, autenticacao.nivelAcesso)) {
    return <SemPermissao></SemPermissao>
  }

  return children;
}

export default PrivateRoute;