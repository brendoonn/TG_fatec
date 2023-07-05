import { useState, useEffect } from "react";

export default function UtilizarPaginacao(itens: any, quantidadePorPagina: number) {
    const [pagina, setPagina] = useState(1);
    const [registros, setRegistros] = useState(itens.slice(0, quantidadePorPagina));
    const count = Math.ceil(itens.length / quantidadePorPagina);

    useEffect(() => {
        const fecthData = async () => {
            try {
                setRegistros(itens.slice(0, quantidadePorPagina));
            } catch (error) { }
        };
        fecthData();
    }, [quantidadePorPagina, itens]);

    const mudarPagina = (numeroPagina: number) => {
        setPagina(numeroPagina);
        setRegistros(itens.slice(0 + quantidadePorPagina * (numeroPagina - 1), quantidadePorPagina * numeroPagina));
    };

    return { pagina, registros, mudarPagina, count };
}

