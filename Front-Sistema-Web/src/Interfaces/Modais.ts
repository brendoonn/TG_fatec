import { categoriaPost, marcaPost } from "./Produto";
import { cargoPost } from "./Usuario";
import { baixa } from "./Venda";

export interface propsModalConfirmacao {
    abrir: boolean;
    mensagem: string;
    fecharModal: any;
    confirmacao: boolean;
}

export interface propsPadraoModal {
    abrir: boolean;
    fecharModal: any;
}

export interface propsModalLoading {
    abrir: boolean;
}

export interface propsMarca{
    marca: marcaPost;
}

export interface propsCargo{
    cargo: cargoPost;
}


export interface propsCategoria{
    categoria: categoriaPost;
}

export interface propsModalHeader{
    titulo: string;
    fecharModal: any;
}

export interface propsModalEndereco{
    cidade: string;
    bairro: string;
    rua: string;
    uf: string;
    numero: number;
    referencia: string;
    cep: string;
}

export interface propsMarca{
    marca: marcaPost;
}

export interface propsModalBaixa{
    baixa: baixa;
}