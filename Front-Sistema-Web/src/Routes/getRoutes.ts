import axios from "axios";

//função que vai pegar os dados ta tabela devida
export async function getData(tabela: string) {
    try {
        const data = await axios.get('http://localhost:3001/getdata/get'+ tabela)    
        return data.data;
    } 
    catch (error) {
    }
}
export async function getDataEdit(tabela: string, id: any) {
    try {
        const data = await axios.get('http://localhost:3001/getdata/get'+  tabela +"/" + id)    
        return data.data;
    } 
    catch (error) {
    }
}

    //quando a página carregar vai executar a função
     




//export { columnsProduct}


