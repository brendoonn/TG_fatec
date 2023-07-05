import { Produto } from "../Interfaces/Produto";

export class InformacoesNotaFiscal {
    produtos: Array<Produto> = [];
    valorRecebido: number = 0;
    troco: number = 0;
    totalFinal: number = 0;
}

export class Venda {
    listaProdutos: Array<Produto> = new Array<Produto>();
    clienteId: number = 0;
    funcionarioId: number = 0;
    clienteNome: string = "";
    meioPagamento: number = 0;
    valorTotal: any = 0;
    quantidadeTotal: any = 0;
    valorRecebido: number = 0.0;
    troco: number = 0.0;
}
export class Baixa {
    listaProdutos: Array<Produto> = new Array<Produto>();
    clienteId: number = 0;
    funcionarioId: number = 0;
    justificativa: string = "";
    meioPagamento: number = 0;
    valorTotal: any = 0;
    quantidadeTotal: any = 0;
    valorRecebido: number = 0.0;
    troco: number = 0.0;
}
export class formaPagamento {
    id: number = 0;
    forPag: string = "";
}

export class ModelVisualizarVenda {
    idVenda: number = 0;
    idCliente: number = 0;
    cpf: string = "";
    dataVenda: string = "";
    produtosVendidos: [] = [];
    nomeCliente: string = "";
    sobrenomeCliente: string = "";
    valorTotal: number = 0;
    quantidadeTotalProdutos: number = 0;
}

export class Empresa {
    cnpj: string = "";
    nome_fantasia: string = "";
    cidade: string = "";
    bairro: string = "";
    rua: string = "";
    uf: string = "";
    cep: string = "";
    numero: number = 0;
    complemento: string = "";
}