export interface Produto {
    ID_produto: string;
    nome: string;
    valor_uni: number;
    valor_total: number;
    quantidade: number;
    desconto: number;
}

export interface ProdutoPost{
    ID_produto: string,
    nome: string,
    valor_uni: number,
    peso: number,
    descricao: string,
    FK_categoria: number,
    FK_marca: number,
    data_available: number
}

export interface marcaPost{
    id: number;
    nome_marca: string;
    nacionalidade: string;
}

export interface categoriaPost{
    id: number;
    categoria: string;
    desc_categoria: string ;
}

export interface Categoria {
    ID_categoria: number;
    categoria: string;
    // Outras propriedades, se houver
}

interface Marca {
    ID_marca: number;
    nome_marca: string;
    // outras propriedades...
}
