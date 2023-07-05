import axios from "axios";

//função que vai pegar os dados ta tabela devida
export async function getLogin(login: string, senha: string) {
    try {
        const data = await axios.get(`http://localhost:3001/getdata/verificauser/${login}/${senha}`)    
        if(data.data === false){
            return false
        }
        else{
            return data.data
        }
    } 
    catch (error) {
    }
}


