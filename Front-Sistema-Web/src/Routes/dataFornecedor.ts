import React, {useEffect, useState} from 'react'
import { GridColDef , GridKeyValue} from "@mui/x-data-grid"
import axios from "axios";
import { response } from "express"

//função que vai pegar os dados ta tabela devida
   export async function getFornecedor() {
            try {
                const data = await axios.get('http://localhost:3001/getdata/getfornecedor')    
                console.log(data.data);   
                return data.data;
            } 
            catch (error) {
            }
}

    //quando a página carregar vai executar a função
     


const columnsProduct: GridColDef[] = [
    //manter o ID pra poder ser identificado como indice da linha
    { field: 'id' , headerName: 'ID', width: 50},
    { field: 'nome', headerName: 'nome', flex: 35, cellClassName:'nome'},
    { field: 'marca', headerName: 'marca', flex: 15, cellClassName: 'marca'},
    { field: 'categoria', headerName: 'categoria ', flex: 15, cellClassName: 'categoria' },
    { field: 'data_validade_lote', headerName: 'data do lote', flex: 15, cellClassName: 'data_validade_lote'},
    { field: 'peso', headerName: 'peso', flex: 15, cellClassName: 'peso'},
    { field: 'obs', headerName: 'obs', flex: 15, cellClassName:'obs' },

]

export { columnsProduct}


