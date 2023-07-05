import { Produto } from "../Interfaces/Produto";

export class InformacoesNotaFiscal {
    nomeEmpresa: string = "";
    endereco?: {} = {};
    produtos: Array<Produto> = [];
    valorRecebido: number = 0;
    troco: number = 0;
    totalFinal: number = 0;
}

export class Compra {
    listaProdutos: Array<Produto> = new Array<Produto>();
    fornecedorId: number = 0;
    meioPagamento: string = "";
    valorTotal: any = 0;
    quantidadeTotal: any = 0;
    valorRecebido: number = 0.0;
    troco: number = 0.0;
}

export class VisualizarCompra {
    idCompra: number = 0;
    idFornecedor: number = 0;
    cnpj: string = "";
    dataCompra: string = "";
    estoque: [] = [];
    razaoSocial: string = "";
    valorCompra: number = 0;
    quantidadeTotalProdutos: number = 0;
}