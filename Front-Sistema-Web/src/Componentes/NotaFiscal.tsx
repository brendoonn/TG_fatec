import { NotaFiscalInterface } from "../Interfaces/NotaFiscaInterface";
import { getDataHorarioAtual } from "../Utils/Tools";
import { formatarPrecoRealSimbolo } from "../Utils/Validacoes/Mascaras";

export default function NotaFiscal(props: NotaFiscalInterface) {

    const pontilhado = { borderStyle: "dotted", borderWidth: "1px", fontSize: " 10px", marginTop: "10px", marginBottom: "10px" };
    const col2 = { width: "20%" };
    const col1 = { width: "10%", textAlign: "left" as "left" };
    const col9 = { width: "90%" };
    const col7 = { width: "70%", textAlign: "left" as "left" };
    const alinharCentro = { textAlign: "center" as "center" };
    const table = { width: "100%" };
    const row = { display: "flex", width: "100%" };
    const espacamentoParagrafo = { margin: 0 };

    return (
        <>
            <div style={{ display: "none" }}>
                <div className="nota-fiscal" id="notaFiscal">
                    <div style={alinharCentro}>
                        <p>{props.empresa.nome_fantasia}</p>
                    </div>
                    <div>
                        <p>{props.empresa.rua} - {props.empresa.numero}</p>
                        <p>{props.empresa.cnpj}</p>
                    </div>
                    <div style={pontilhado}></div>
                    <div style={alinharCentro}>
                        <p>CUPOM NÃO FISCAL</p>
                    </div>
                    <div style={pontilhado}></div>
                    <table style={table}>
                        <thead>
                            <tr>
                                <th style={col1}>COD</th>
                                <th style={col7}>DESCRICAO</th>
                                <th style={col1}>QTD.</th>
                                <th style={col1}>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.produtos.map((produto: any, index: any) => (
                                <tr key={index}>
                                    <td style={col1}>{produto.ID_produto}</td>
                                    <td style={col7}>{produto.nome}</td>
                                    <td style={col1}>{produto.quantidade}</td>
                                    <td style={col1}>{formatarPrecoRealSimbolo(produto.valor_total)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={pontilhado}></div>
                    <div style={row}>
                        <div style={col9}>
                            <p style={espacamentoParagrafo}>TOTAL</p>
                            <p style={espacamentoParagrafo}>VALOR RECEBIDO</p>
                            <p style={espacamentoParagrafo}>TROCO</p>
                        </div>
                        <div style={col2}>
                            <p style={espacamentoParagrafo}>{formatarPrecoRealSimbolo(props.totalFinal)}</p>
                            <p style={espacamentoParagrafo}>{formatarPrecoRealSimbolo(props.valorRecebido)}</p>
                            <p style={espacamentoParagrafo}>{formatarPrecoRealSimbolo(props.troco)}</p>
                        </div>
                    </div>
                    <div style={pontilhado}></div>
                    <div>
                        <p>Emissao       : {getDataHorarioAtual()}</p>
                    </div>
                    <div style={alinharCentro}>
                        <p>OBRIGADO E VOLTE SEMPRE</p>
                    </div>
                </div>
            </div>
        </>
    );
}