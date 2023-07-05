import { Empresa } from "../Models/ModelVenda";
import { Produto } from "./Produto";

export interface NotaFiscalInterface {
    empresa: Empresa;
    produtos:  Array<Produto>;
    totalFinal: number;
    valorRecebido: number;
    troco: number;
}
