export class ModelProduto {
    ID_produto: string = "";
    nome: string = "";
    min_recomendado:  number = 0;
    valor_uni: number = 0.0;
    valorUnitario: string = "0,00";
    peso: number = 0.0;
    pesoConvertido: string = "0,0";
    descricao: string = "";
    FK_categoria: number = 0;
    nome_categoria: string = "";
    FK_marca: number = 0;
    data_available: number = 1;
    quantidade_recomendada: number = 0;
};

export class ItemProduto {
    ID_categoria: number = 0;
    ID_marca: number = 0;
    ID_produto: number = 0;
    categoria: string = "";
    desc_categoria: string = "";
    descricao: string = ""; 
    nome: string = ""; 
    nome_marca: string = ""; 
    peso: number = 0.0;
    min_recomendado: number = 0.0;
    valor_uni: number = 0.0;
    valorTotal: number = 0.0;
    quantidade: number = 0;
    desconto: number = 0.0;
}
export class produtoSimp {
    ID_produto: number = 0;
    nome: string = ""; 
    valor_uni: number = 0.0;
    peso: number = 0.0;
    descricao: string = ""; 
    FK_categoria: number = 0;
    FK_marca: number = 0; 
    data_avaliable: boolean = true;
    min_recomendado: number = 0;
}

export class ModelEstoque {
    ID_compra: number = 0; 
    data_compra: string =  "";
    razao_social: string = "";
    valor_compra: number = 0; 
    valor: string = "";
    validade: string = "";
    quantidade: number = 0;
    ID_produto: number = 0;
    fornecedor: number = 0;
}

export class ModelBaixaEstoque {
    ID_produto: number = 0; 
    ID_funcionario: number = 0; 
    nome: string = "";
    quantidade: number = 0;
    justificativa: string = "";
}


export class Marca{
    ID_marca: number = 0;
    nome_marca: string = "";
    nacionalidade: string = "";
}

export class Categoria{
    categoria: string = "";
    desc_categoria?: string = "";
    ID_categoria: number = 0;
}