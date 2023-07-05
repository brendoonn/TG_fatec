import axios from "axios";
const url = 'http://localhost:3001/putdata/put'  
const exclusao = 'http://localhost:3001/putdata/put/excluir'  

//função que vai pegar os dados ta tabela devida
export async function putData(tabela: string, dados: any) {

  try{
    var editar = await axios.put(`http://localhost:3001/putdata/put${tabela}`, dados )  
    return editar.status
  }
  catch(exception){
    console.log("ERRO", exception);
    return exception
  }
}


export async function excluirData(tabela: string, id: any) {
  try{
    var editar = await axios.put(`${exclusao}`, tabela, id)  
    return editar.status
  }
  catch(exception){
    console.log("ERRO", exception);
    return exception
  }
}






export async function putDataProdutos(dados: any) {

  try {
    const endereco = await axios.get('http://localhost:3001/getdata/getendereco')
    const fornecedor = await axios.get('http://localhost:3001/getdata/getfornecedor')        
    console.log(endereco.data);   
    //return endereco.data;
  } 
  catch (error) {
  }
  axios.put(`${url}$`, dados )  
  .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

