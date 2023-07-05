import { Produto } from "./Produto";

export interface formaPagamento {
  id: number;
  forPag: string;
}

export interface Venda {
  listaProdutos: Array<Produto>;
  clienteId: number;
  clienteNome: string;
  meioPagamento: number;
  valorTotal: 0;
  quantidadeTotal: any;
  valorRecebido: number;
  troco: number;
}
export interface Compra {
  listaProdutos: Array<Produto>;
  fornecedorId: number;
  meioPagamento: string;
  valorTotal: 0;
  quantidadeTotal: any;
  valorRecebido: number;
  troco: number;
}

export interface propsPrimeiraEtapaVendas {
  listaProdBanco: any;
  alterarListaProdBanco: any;
  listaCliente: any;
  calcularTotalCompra: any;
  alterarVenda: any;
  venda: Venda;
}
export interface propsPrimeiraEtapaCompras {
  listaProdBanco: any;
  alterarListaProdBanco: any;
  alterarFornecedor: any;
  listaFornecedor: any;
  calcularTotalCompra: any;
  fornecedor: any;
  alterarVenda: any;
  compra: Compra;
}

export interface propsSegundaEtapaVendas {
  venda: Venda;
  listaFormaPagamento: Array<formaPagamento>;
}

export interface clienteVenda {
  id: number;
  nome: string;
}

export interface propsSegundaEtapaCompras {
  compra: Compra;
  fornecedor: fornecedorCompra;
}

export interface fornecedorCompra {
  id: number;
  razao_social: string;
}
export interface baixa {
  id: number;
  nome: string;
  quantidade: number;
  ID_estoque: number;
  descricao: string;
  ID_produto: number;
}
