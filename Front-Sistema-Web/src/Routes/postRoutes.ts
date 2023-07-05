import axios from "axios";

//função que vai pegar os dados ta tabela devida
export async function postData(tabela: string, dados: any) {

  try {
    var enviar = await axios.post('http://localhost:3001/postdata/post' + tabela, dados);
    return enviar.status;
  } 
  catch (exception) {
    console.log("ERRO", exception);
    return exception;
  }
}

export async function postImage(tabela: string, dados: any) {
  console.log(dados)
  try {
    var enviar = await axios.post('http://localhost:3001/postdata/postimage/' + tabela, dados);
    return enviar.status;
  } 
  catch (exception) {
    console.log("ERRO", exception);
    return exception;
  }
}


