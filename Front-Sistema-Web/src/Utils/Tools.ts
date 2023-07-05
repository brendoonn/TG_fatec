import axios from "axios";
import { Produto } from "../Interfaces/Produto";
import { Personalizacao } from "../Models/ModelPersonalizacao";
//import { useNavigate  } from 'react-router-dom';
import {empresa} from "../Interfaces/Empresa";

export const selecionarItem = (
  event: React.MouseEvent<unknown>,
  id: string,
  itemSelecionado: any,
  setItemSelecionado: any
) => {
  const selectedIndex = itemSelecionado.indexOf(id);
  let novoItemSelecionado: readonly string[] = [];

  if (selectedIndex === -1) {
    novoItemSelecionado = novoItemSelecionado.concat(itemSelecionado, id);
  } else if (selectedIndex === 0) {
    novoItemSelecionado = novoItemSelecionado.concat(itemSelecionado.slice(1));
  } else if (selectedIndex === itemSelecionado.length - 1) {
    novoItemSelecionado = novoItemSelecionado.concat(
      itemSelecionado.slice(0, -1)
    );
  } else if (selectedIndex > 0) {
    novoItemSelecionado = novoItemSelecionado.concat(
      itemSelecionado.slice(0, selectedIndex),
      itemSelecionado.slice(selectedIndex + 1)
    );
  }

  setItemSelecionado(novoItemSelecionado);
};

export const selecionarTudo = (
  event: React.ChangeEvent<HTMLInputElement>,
  linhas: any,
  setItemSelecionado: any
) => {
  if (event.target.checked) {
    const novaSelecao = linhas.map((n: any) => n.id);
    setItemSelecionado(novaSelecao);
    return;
  }
  setItemSelecionado([]);
};

export async function ObterEnderecoViaCep(cep: any) {
  try {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return data;
  } catch (error) {
    console.log("erro", error);
    return null;
  } finally {
  }
}

export function calcularValorTotalCompra(listaProdutos: Array<Produto>) {
  var total = 0;
  listaProdutos.forEach((prod) => {
    total = total + prod.valor_total;
  });
  return total;
}

export function calcularQuantidadeTotalCompra(listaProdutos: Array<Produto>) {
  var quantidadeTotal = 0;
  listaProdutos.forEach((prod) => {
    quantidadeTotal = quantidadeTotal + prod.quantidade;
  });
  return quantidadeTotal;
}

export function alterarQuantidade(opcao: number, quantidade: number) {
  switch (opcao) {
    case 1:
      quantidade = quantidade + 1;
      break;
    case 2:
      quantidade = quantidade - 1;
      break;
    default:
      return quantidade;
  }
  return quantidade;
}

export const IrPara = (url: any) => {
  window.location.replace(url);
};

/* export const IrParaEdicao = (url: string, listaProdutos: Produto) => {
  const navigate  = useNavigate();
  const queryParams = new URLSearchParams();
  queryParams.append('produtos', JSON.stringify(listaProdutos));

  navigate(`${url}?${queryParams.toString()}`);
}; */

export function carregarImagem(e: any) {
  var imagemBase64 = "";
  if (e.target.files[0]) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      var base64 = reader.result;
      if (base64 !== null) {
        return (imagemBase64 = base64?.toString());
      }
    };
  }
  return imagemBase64;
}

export function filterByValue(array: any, string: any) {
  return array.filter((o: any) =>
    Object.keys(o).some((k) =>
      String(o[k])?.toLowerCase().includes(string.toLowerCase())
    )
  );
}

export function converterValor(valor: string) {
  const filtrarValor = valor
    .split("")
    .filter((s: any) => /\d/.test(s))
    .join("");
  var transformarValor =
    filtrarValor.slice(0, -2) + "." + filtrarValor.slice(-2);
  var conversao = parseFloat(transformarValor);

  return conversao;
}

export function converterPeso(peso: string) {
  const filtrarPeso = peso
    .split("")
    .filter((s: any) => /\d/.test(s))
    .join("");
  var transformarPeso = filtrarPeso.slice(0, -2) + "." + filtrarPeso.slice(-2);
  var conversao = parseFloat(transformarPeso);

  return conversao;
}

export function obterValorBackground(classe: string) {
  const elemento = document.querySelector(`${"." + classe}`);

  if (elemento) {
    return getComputedStyle(elemento)?.backgroundColor;
  }
  return "";
}

export function verificaPermissoes(
  permissoesNecessarias: string[],
  permissaoAtribuida: string
) {
  if (!permissoesNecessarias.includes(permissaoAtribuida)) {
    return false;
  } else return true;
}

export function verificaPermissaoMenu(listaMenu: any, permissao: string) {
  if (
    !listaMenu[0].subitens.some((item: any) => item.acesso.includes(permissao))
  )
    return false;
  else return true;
}

export function verificarDisponibilidadeDeImagens(temaSistema: any, modo: any) {
  if (modo === "escuro") {
    if (temaSistema.logoEscuro) return "/Imagens/Sistema/" + temaSistema.logoEscuro;
    else if (temaSistema.nomeFantasia) return temaSistema.nomeFantasia;
    else return temaSistema.logoPadraoEscuro;
  } else {
    if (temaSistema.logoClaro) return "/Imagens/Sistema/" + temaSistema.logoClaro;
    else if (temaSistema.nomeFantasia) return temaSistema.nomeFantasia;
    else return temaSistema.logoPadraoClaro;
  }
}

export function getDataHorarioAtual() {
  var data = new Date();

  // Obtém os componentes da data e do horário
  var dia = data.getDate();
  var mes = data.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
  var ano = data.getFullYear();
  var horas = data.getHours();
  var minutos = data.getMinutes();

  // Formata os componentes para o formato desejado
  var formatoData =
    ("0" + dia).slice(-2) + "/" + ("0" + mes).slice(-2) + "/" + ano;
  var formatoHorario =
    ("0" + horas).slice(-2) + ":" + ("0" + minutos).slice(-2);

  // Define AM ou PM com base nas horas
  var amPm = horas >= 12 ? "PM" : "AM";

  // Retorna a data e o horário formatados
  return formatoData + " - " + formatoHorario + " - " + amPm;
}

export function exibeImagemPersonalizacao(base64: any, url: any) {
  var urlPadrao = "Imagens/Sistema/";
  if (base64) {
    return `${urlPadrao}${base64}`;
  } else if (url) {
    return `${urlPadrao}${url}`;
  }
  return "";
}

export const carregarImagemPersonalizacao = (e: any, setImage: any, setFile: any) => {
  if (e.target.files[0]) {
      const file = e.target.files?.[0]; // Obtém o primeiro arquivo selecionado
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function () {
          var base64 = reader.result;
          if (base64 !== null) {
              setImage(base64?.toString());
          }
      }
  };
}

export const montarDadosEmpresa = (empresa: Personalizacao) => {
  var informacoesEmpresa: empresa;
  informacoesEmpresa = {
      emp_cnpj: empresa.cnpj,
      emp_bairro: empresa.bairro,
      emp_cep: empresa.cep,
      emp_complemento: empresa.complemento,
      emp_data: empresa.data_abertura,
      emp_imagem: empresa.emp_imagem,
      emp_logomarca_claro: empresa.logomarca_claro,
      emp_logomarca_escuro: empresa.logomarca_escuro,
      emp_logradouro: empresa.rua,
      emp_municipio: empresa.cidade,
      emp_nome: empresa.nome_empresarial,
      emp_nome_fantasia: empresa.nome_fantasia,
      emp_numero: empresa.numero,
      emp_telefone: empresa.telefone,
      emp_uf: empresa.uf,
      ID_empresa: empresa.ID_empresa,
      emp_ie: empresa.inscricao_estadual,
      emp_im: empresa.inscricao_municipal
  }
  return informacoesEmpresa;
}
